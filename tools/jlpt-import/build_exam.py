#!/usr/bin/env python3
"""
Orchestrator: PDF đề + PDF transcript + audio + file đáp án  ->  1 file JSON theo schema.

Chạy thử an toàn trước khi tin kết quả:
    python3 build_exam.py jlpt-source/2025-07/exam.pdf --dry-run

Bóc thật (cần đủ answer key + audio):
    python3 build_exam.py jlpt-source/2025-07 \\
        --answer-key jlpt-source/answer_key.xlsx \\
        --level N3 --session "2025-07" \\
        --out tools/jlpt-import/output/n3-2025-07.json

QUAN TRỌNG: output/ đã nằm trong .gitignore. Đừng đổi chỗ ghi ra ngoài thư mục đó.
"""

from __future__ import annotations

import argparse
import json
import sys
from pathlib import Path

from schema import (
    JlptExam,
    JlptImportFile,
    MondaiGroup,
    TimedBlock,
    BLOCK_LABELS,
    missing_choice_notes,
)
from extract_exam import build_questions, extract_full_text, split_by_mondai
import answer_key as ak
from audio import find_audio_file, ensure_mp3, audio_duration_seconds

# TODO: chỉnh lại đúng theo đề thật của bạn sau khi chạy --dry-run xem 問題 nào là gì.
# Khoá là số thứ tự 問題 TRONG FILE PDF (1, 2, 3, ...), value là MondaiType chuẩn.
DEFAULT_MONDAI_MAP: dict[int, str] = {
    1: "kanji_yomi",
    2: "hyouki",
    3: "bunmyaku_kitei",
    4: "iikae_ruigi",
    5: "youhou",
}


def dry_run(pdf_path: Path) -> None:
    """Chỉ in ra những gì tách được, không ghi file, không cần answer key/audio."""
    text = extract_full_text(pdf_path)
    blocks = split_by_mondai(text)
    print(f"Tách được {len(blocks)} khối 問題 từ {pdf_path.name}\n")
    for b in blocks:
        from extract_exam import split_questions_in_block

        qs = split_questions_in_block(b.body)
        print(f"問題{b.mondai_number} — {len(qs)} câu")
        print(f"  hướng dẫn: {b.instruction[:70]}")
        for q in qs[:3]:
            print(f"  câu {q.item_number}: {q.stem}")
            for i, c in enumerate(q.choices, 1):
                print(f"      {i}. {c}")
        if len(qs) > 3:
            print(f"  ... còn {len(qs) - 3} câu nữa")
        print()

    print(
        "Nếu số 問題 / số câu / nội dung ở trên KHỚP với PDF thật -> chạy tiếp không --dry-run.\n"
        "Nếu SAI -> đối chiếu với `python3 inspect_pdf.py <pdf>` rồi sửa extract_exam.py."
    )


def build_one(
    folder: Path,
    answer_key_path: Path,
    level: str,
    session: str,
    out_path: Path,
    mondai_map: dict[int, str],
) -> None:
    pdfs = sorted(folder.glob("*.pdf"))
    if len(pdfs) != 2:
        raise ValueError(f"{folder} phải có đúng 2 file PDF (đề + transcript), thấy {len(pdfs)}")

    # Đoán file đề vs transcript theo kích thước nội dung — đề thi luôn nhiều 問題 hơn.
    # Không đáng tin 100%; in ra để người chạy tự xác nhận.
    exam_pdf, transcript_pdf = pdfs
    len0 = len(extract_full_text(exam_pdf))
    len1 = len(extract_full_text(transcript_pdf))
    if len1 > len0:
        exam_pdf, transcript_pdf = transcript_pdf, exam_pdf
    print(f"Đoán: đề = {exam_pdf.name} | transcript nghe = {transcript_pdf.name}")
    print("  (nếu đoán sai, đổi tên file cho rõ ràng rồi chạy lại)")

    audio_src = find_audio_file(folder)
    if not audio_src:
        raise ValueError(f"Không tìm thấy đúng 1 file âm thanh (.mp3/.rar) trong {folder}")
    mp3_path = ensure_mp3(audio_src, work_dir=out_path.parent / f"_audio_{folder.name}")
    duration = audio_duration_seconds(mp3_path)
    print(f"Âm thanh: {mp3_path.name} — {duration:.0f} giây")

    id_prefix = f"{level.lower()}-{session}"
    questions, groups = build_questions(exam_pdf, level, id_prefix, mondai_map)

    ak_df = ak.load_answer_key(answer_key_path)
    ak_rows = ak.answers_for_session(ak_df, level, session)
    answer_by_qno = dict(zip(ak_rows["question_no"], ak_rows["answer"]))

    unmatched = []
    for q in questions:
        item_no = int(q.id.rsplit("q", 1)[1])
        ans = answer_by_qno.get(item_no)
        if ans is None:
            unmatched.append(q.id)
        else:
            q.answerIndex = ans - 1  # đáp án trong file gốc đánh số 1-4

    if unmatched:
        print(f"⚠ {len(unmatched)} câu không khớp được đáp án: {unmatched}")

    missing_notes = missing_choice_notes(questions)
    if missing_notes:
        print(
            f"⚠ {len(missing_notes)}/{len(questions)} câu CHƯA có lời giải cho phương án "
            f"(bắt buộc phải bổ sung trước khi mổ xẻ có ý nghĩa — mục 8.7). "
            f"Dùng mẫu lời nhắc AI ở mục 11.9 để soạn rồi dán đè vào JSON."
        )

    exam = JlptExam(
        id=id_prefix,
        level=level,  # type: ignore[arg-type]
        title=f"{level} 【{session}】",
        blocks=[
            TimedBlock(
                id="moji_goi", label=BLOCK_LABELS["moji_goi"][0],
                labelEn=BLOCK_LABELS["moji_goi"][1], minutes=30,
                mondai=[g.mondai for g in groups],
            ),
        ],
        groups=groups,
        questionIds=[q.id for q in questions],
        source="user-provided",
    )

    out = JlptImportFile(formatVersion=1, exam=exam, groups=groups, questions=questions)
    out_path.parent.mkdir(parents=True, exist_ok=True)
    out_path.write_text(json.dumps(out.to_dict(), ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n✅ Đã ghi {out_path} ({len(questions)} câu)")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("path", help="File PDF (dùng với --dry-run) hoặc thư mục 1 đợt thi")
    ap.add_argument("--dry-run", action="store_true", help="Chỉ in kết quả tách, không ghi gì")
    ap.add_argument("--answer-key", type=Path)
    ap.add_argument("--level", default="N3")
    ap.add_argument("--session", help='VD: "2025-07"')
    ap.add_argument("--out", type=Path)
    args = ap.parse_args()

    target = Path(args.path)

    if args.dry_run:
        if not target.is_file():
            print("--dry-run cần trỏ thẳng vào 1 file PDF đề thi.", file=sys.stderr)
            sys.exit(1)
        dry_run(target)
        return

    if not args.answer_key or not args.session or not args.out:
        print("Thiếu --answer-key / --session / --out (bỏ qua nếu chỉ dùng --dry-run).", file=sys.stderr)
        sys.exit(1)

    build_one(
        folder=target,
        answer_key_path=args.answer_key,
        level=args.level,
        session=args.session,
        out_path=args.out,
        mondai_map=DEFAULT_MONDAI_MAP,
    )


if __name__ == "__main__":
    main()
