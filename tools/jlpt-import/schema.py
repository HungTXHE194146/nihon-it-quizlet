"""
Nguồn sự thật duy nhất cho hình dạng JSON đề JLPT.

Khớp 1:1 với mô hình dữ liệu ở docs/jlpt-practice-test-research.md mục 10 và định dạng
nhập ở mục 11.3. Mọi script trong tools/jlpt-import/ phải build dữ liệu qua các hàm ở đây,
không tự ghép dict tay ở nơi khác — để không có hai script tình cờ sinh ra hai hình dạng
JSON khác nhau.
"""

from __future__ import annotations

from dataclasses import dataclass, field, asdict
from typing import Literal, Optional

JlptLevel = Literal["N5", "N4", "N3", "N2", "N1"]

ScoringSection = Literal["gengo_chishiki", "dokkai", "choukai"]

MondaiType = Literal[
    # 文字・語彙
    "kanji_yomi", "hyouki", "bunmyaku_kitei", "iikae_ruigi", "youhou",
    # 文法
    "bunpou_keishiki", "bun_no_kumitate", "bunshou_no_bunpou",
    # 読解
    "naiyou_tan", "naiyou_chuu", "naiyou_chou", "jouhou_kensaku",
    # 聴解
    "kadai_rikai", "point_rikai", "gaiyou_rikai", "hatsuwa_hyougen", "sokuji_outou",
]

# Nhãn tiếng Nhật + tiếng Anh chuẩn cho từng khối, dùng khi build TimedBlock.
BLOCK_LABELS: dict[str, tuple[str, str]] = {
    "moji_goi": ("言語知識（文字・語彙）", "Vocab"),
    "bunpou_dokkai": ("言語知識（文法）・読解", "Grammar & Reading"),
    "choukai": ("聴解", "Listening"),
}


@dataclass
class JlptChoice:
    text: str
    note: Optional[str] = None
    linkedItemKey: Optional[str] = None


@dataclass
class JlptQuestion:
    id: str
    level: JlptLevel
    mondai: MondaiType
    scoringSection: ScoringSection
    choices: list[JlptChoice]
    answerIndex: int
    stem: Optional[str] = None
    stemUnderline: Optional[tuple[int, int]] = None
    explanation: Optional[str] = None
    passageId: Optional[str] = None
    audioId: Optional[str] = None
    transcript: Optional[str] = None


@dataclass
class MondaiGroup:
    mondai: MondaiType
    instruction: str
    questionIds: list[str]


@dataclass
class TimedBlock:
    id: str
    label: str
    minutes: int
    mondai: list[MondaiType]
    labelEn: Optional[str] = None


@dataclass
class JlptExam:
    id: str
    level: JlptLevel
    title: str
    blocks: list[TimedBlock]
    groups: list[MondaiGroup]
    questionIds: list[str]
    source: Literal["original", "official-sample", "user-provided"] = "user-provided"


@dataclass
class JlptImportFile:
    """Hình dạng đúng như mô tả ở mục 11.3 — đây là cái ghi ra output/*.json."""

    formatVersion: int
    exam: JlptExam
    groups: list[MondaiGroup]
    questions: list[JlptQuestion]

    def to_dict(self) -> dict:
        return asdict(self)


def missing_choice_notes(questions: list[JlptQuestion]) -> list[str]:
    """Id các câu còn thiếu lời giải cho ít nhất một phương án (mục 8.7, 11.6).

    Dùng để in cảnh báo sau khi bóc — PDF đề thi gốc không có sẵn lời giải,
    nên gần như chắc chắn TOÀN BỘ câu vừa bóc sẽ nằm trong danh sách này.
    """
    out = []
    for q in questions:
        if any(not c.note for c in q.choices):
            out.append(q.id)
    return out
