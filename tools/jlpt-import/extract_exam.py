"""
Tách PDF đề thi (đã có text layer) thành 問題 / câu hỏi / phương án.

TRẠNG THÁI: heuristic đầu tiên, CHƯA chạy thử trên file thật.
Cấu trúc text-layer của PDF khác nhau tuỳ nguồn phát hành (thứ tự đọc, cách ngắt dòng,
có giữ bảng 2 cột hay tuyến tính hoá). Thuật toán dưới đây dựa trên đúng những gì nhìn
thấy được qua ảnh chụp màn hình đề mẫu, KHÔNG dựa trên việc đã test với text layer thật.

Cách kiểm tra và sửa: chạy `build_exam.py ... --dry-run` trên một file thật, đọc phần
in ra, và tinh chỉnh hai hàm `split_by_mondai` / `split_questions_in_block` cho khớp.
Không sửa mù — luôn đối chiếu với `inspect_pdf.py` trên chính file đó.
"""

from __future__ import annotations

import re
from dataclasses import dataclass
from pathlib import Path

import pdfplumber

from schema import JlptChoice, JlptQuestion, MondaiGroup, MondaiType

# 問題 có thể đánh số bằng chữ số thường hoặc fullwidth (１２３ thay vì 123).
_FULLWIDTH_DIGITS = str.maketrans("0123456789", "０１２３４５６７８９")
_TO_HALFWIDTH = str.maketrans("０１２３４５６７８９", "0123456789")

_MONDAI_HEADER_RE = re.compile(r"問題\s*([0-9０-９]+)")


@dataclass
class MondaiBlock:
    mondai_number: int  # số thứ tự 問題N trong ĐỀ (1, 2, 3...), KHÔNG phải MondaiType
    instruction: str
    body: str


@dataclass
class RawQuestion:
    item_number: int  # số thứ tự câu trong toàn bài (1, 2, 3... 73)
    stem: str
    choices: list[str]


def _to_halfwidth_int(s: str) -> int:
    return int(s.translate(_TO_HALFWIDTH))


def extract_full_text(pdf_path: Path) -> str:
    """Nối text mọi trang bằng extract_text(layout=True) — giữ khoảng cách ngang,
    thường giúp giữ được thứ tự đọc đúng hơn cho layout 2 cột kiểu đề JLPT."""
    parts = []
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            parts.append(page.extract_text(layout=True) or "")
    return "\n".join(parts)


def split_by_mondai(full_text: str) -> list[MondaiBlock]:
    """Cắt toàn bộ text theo các dòng '問題N ... hướng dẫn ... 。'"""
    matches = list(_MONDAI_HEADER_RE.finditer(full_text))
    if not matches:
        raise ValueError(
            "Không tìm thấy dòng '問題N' nào trong text đã trích. "
            "Có thể PDF này text layer bị đảo thứ tự hoặc dùng font nhúng lạ — "
            "chạy inspect_pdf.py để xem extract_text(layout=True) thật trông ra sao."
        )

    blocks: list[MondaiBlock] = []
    for i, m in enumerate(matches):
        mondai_no = _to_halfwidth_int(m.group(1))
        start = m.end()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(full_text)
        chunk = full_text[start:end]

        # Hướng dẫn thường là câu đầu tiên, kết thúc bằng "。" trước khi vào câu hỏi số 1.
        instr_match = re.search(r"^(.*?。)", chunk, flags=re.S)
        instruction = instr_match.group(1).strip() if instr_match else ""
        body = chunk[instr_match.end():] if instr_match else chunk

        blocks.append(MondaiBlock(mondai_number=mondai_no, instruction=instruction, body=body))
    return blocks


def split_questions_in_block(body: str) -> list[RawQuestion]:
    """Tách một khối 問題 thành từng câu.

    Ý tưởng: bốn phương án luôn là các token số ĐÚNG BẰNG 1,2,3,4 xuất hiện liên tiếp
    (không nhất thiết liền dòng — layout lưới 2x2 vẫn thoả nếu đọc theo đúng thứ tự
    1 rồi 2 rồi 3 rồi 4). Số đứng ngay trước cụm đó, tách biệt khỏi 1-4, là số thứ tự
    câu hỏi. Văn bản nằm giữa "số thứ tự câu" và "phương án 1" là đề bài (stem).
    """
    # (giá_trị, vị_trí_bắt_đầu, vị_trí_kết_thúc) cho MỌI token số độc lập trong block.
    number_tokens = [
        (int(m.group(1)), m.start(), m.end())
        for m in re.finditer(r"(?<!\d)(\d{1,3})(?!\d)", body)
    ]

    questions: list[RawQuestion] = []
    i = 0
    while i < len(number_tokens):
        val, start, end = number_tokens[i]

        # Tìm điểm bắt đầu một cụm 4 phương án liên tiếp đúng thứ tự 1,2,3,4.
        if (
            val == 1
            and i + 3 < len(number_tokens)
            and [t[0] for t in number_tokens[i : i + 4]] == [1, 2, 3, 4]
        ):
            item_number = number_tokens[i - 1][0] if i > 0 else len(questions) + 1
            stem_start = number_tokens[i - 1][2] if i > 0 else 0
            stem = body[stem_start:start].strip()

            # Mỗi phương án bắt đầu ngay SAU token số của chính nó (choice_starts[k]),
            # và kết thúc ngay TRƯỚC token số của phương án kế tiếp (choice_ends[k]).
            # Bug đã từng có ở đây: dùng nhầm vị trí KẾT THÚC của token kế tiếp thay vì
            # BẮT ĐẦU, khiến mỗi phương án dính thừa số thứ tự của phương án sau nó.
            choice_starts = [number_tokens[i + k][2] for k in range(4)]
            choice_ends = [number_tokens[i + k][1] for k in range(1, 4)] + [
                # phương án cuối kết thúc ở chỗ bắt đầu số thứ tự câu TIẾP THEO,
                # hoặc hết block nếu đây là câu cuối.
                number_tokens[i + 4][1] if i + 4 < len(number_tokens) else len(body)
            ]
            choices = [
                body[choice_starts[k]:choice_ends[k]].strip() for k in range(4)
            ]

            questions.append(RawQuestion(item_number=item_number, stem=stem, choices=choices))
            i += 4
        else:
            i += 1

    return questions


def build_questions(
    pdf_path: Path,
    level: str,
    id_prefix: str,
    mondai_type_map: dict[int, MondaiType],
) -> tuple[list[JlptQuestion], list[MondaiGroup]]:
    """`mondai_type_map` ánh xạ số thứ tự 問題N trong ĐỀ NÀY sang MondaiType chuẩn
    (ví dụ đề này 問題1 = kanji_yomi, 問題2 = hyouki...). Phải truyền tay vì thứ tự
    問題 khác nhau giữa các kỳ thi và giữa 文字語彙/文法/読解.
    """
    full_text = extract_full_text(pdf_path)
    blocks = split_by_mondai(full_text)

    questions: list[JlptQuestion] = []
    groups: list[MondaiGroup] = []

    for block in blocks:
        mondai_type = mondai_type_map.get(block.mondai_number)
        if mondai_type is None:
            print(
                f"  [bỏ qua] 問題{block.mondai_number} không có trong mondai_type_map "
                f"— tự thêm ánh xạ nếu cần bóc phần này."
            )
            continue

        raw_questions = split_questions_in_block(block.body)
        question_ids = []
        for rq in raw_questions:
            qid = f"{id_prefix}-q{rq.item_number}"
            question_ids.append(qid)
            questions.append(
                JlptQuestion(
                    id=qid,
                    level=level,  # type: ignore[arg-type]
                    mondai=mondai_type,
                    scoringSection="gengo_chishiki",  # TODO: suy ra đúng theo block
                    stem=rq.stem,
                    choices=[JlptChoice(text=c) for c in rq.choices],
                    answerIndex=-1,  # điền sau khi khớp với answer_key
                )
            )
        groups.append(
            MondaiGroup(
                mondai=mondai_type,
                instruction=block.instruction,
                questionIds=question_ids,
            )
        )

    return questions, groups


if __name__ == "__main__":
    import sys

    if len(sys.argv) != 2:
        print("Dùng: python3 extract_exam.py duong/dan/exam.pdf")
        print("(chế độ debug: chỉ in số 問題 và số câu tách được, không map mondai type)")
        sys.exit(1)

    text = extract_full_text(Path(sys.argv[1]))
    blocks = split_by_mondai(text)
    for b in blocks:
        qs = split_questions_in_block(b.body)
        print(f"問題{b.mondai_number}: {len(qs)} câu — hướng dẫn: {b.instruction[:60]}...")
        for q in qs[:2]:
            print(f"    câu {q.item_number}: {q.stem[:40]!r} | đáp án: {q.choices}")
