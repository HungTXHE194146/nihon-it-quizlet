"""
Đọc file đáp án tổng hợp (nhiều kỳ thi trong 1 file .xlsx/.csv).

TRẠNG THÁI: khung dò cột tự động — CHƯA kiểm chứng với file thật.
Chưa biết chính xác tên cột trong file của bạn, nên hàm dưới đây thử đoán theo các tên
thường gặp; nếu đoán sai, nó in ra danh sách cột thật để bạn/tôi chỉnh lại danh sách
`_COLUMN_ALIASES` cho khớp — không cần đoán mù lần hai.
"""

from __future__ import annotations

from pathlib import Path

import pandas as pd

# Mỗi khoá là tên cột chuẩn hoá ta cần; mỗi value là các biến thể tên cột hay gặp.
# Khớp không phân biệt hoa/thường, bỏ khoảng trắng thừa.
_COLUMN_ALIASES: dict[str, list[str]] = {
    "level": ["level", "cấp", "cấp độ", "n"],
    "session": ["session", "kỳ thi", "đợt thi", "date", "ngày", "test", "exam"],
    "mondai": ["mondai", "問題", "section", "phần", "question type", "part"],
    "question_no": ["question", "câu", "số câu", "no", "q", "question no", "問"],
    "answer": ["answer", "đáp án", "correct", "key"],
}


def _normalize(col: str) -> str:
    return str(col).strip().lower()


def _match_columns(df: pd.DataFrame) -> dict[str, str]:
    """Trả về map {tên_chuẩn: tên_cột_thật}. Ném lỗi kèm danh sách cột nếu thiếu."""
    normalized = {_normalize(c): c for c in df.columns}
    resolved: dict[str, str] = {}
    missing: list[str] = []

    for key, aliases in _COLUMN_ALIASES.items():
        found = next((normalized[a] for a in aliases if a in normalized), None)
        if found:
            resolved[key] = found
        else:
            missing.append(key)

    if missing:
        raise ValueError(
            f"Không dò được cột cho: {missing}.\n"
            f"Các cột thật trong file: {list(df.columns)}\n"
            f"Sửa _COLUMN_ALIASES trong tools/jlpt-import/answer_key.py cho khớp, "
            f"hoặc cho tôi biết tên cột thật để tôi sửa giúp."
        )
    return resolved


def load_answer_key(path: Path) -> pd.DataFrame:
    """Đọc file đáp án, trả về DataFrame đã đổi tên cột về chuẩn:
    level, session, mondai, question_no, answer (answer là số nguyên 1-4).
    """
    if path.suffix.lower() in (".xlsx", ".xls"):
        df = pd.read_excel(path)
    elif path.suffix.lower() == ".csv":
        df = pd.read_csv(path)
    else:
        raise ValueError(f"Định dạng chưa hỗ trợ: {path.suffix}. Dùng .xlsx/.xls/.csv.")

    col_map = _match_columns(df)
    df = df.rename(columns={v: k for k, v in col_map.items()})
    df = df[list(_COLUMN_ALIASES.keys())]

    # Đáp án có thể ghi dạng "1", "①", hoặc chữ — chuẩn hoá về int 1-4.
    df["answer"] = df["answer"].apply(_normalize_answer_value)
    return df


def _normalize_answer_value(v) -> int:
    s = str(v).strip()
    circled = {"①": 1, "②": 2, "③": 3, "④": 4}
    if s in circled:
        return circled[s]
    try:
        return int(s)
    except ValueError as e:
        raise ValueError(f"Không đọc được giá trị đáp án: {v!r}") from e


def answers_for_session(df: pd.DataFrame, level: str, session: str) -> pd.DataFrame:
    """Lọc đúng một đợt thi. `session` so khớp linh hoạt (chứa chuỗi, không phân biệt hoa/thường)."""
    mask = (
        df["level"].astype(str).str.strip().str.upper() == level.upper()
    ) & (
        df["session"].astype(str).str.contains(session, case=False, na=False)
    )
    result = df[mask]
    if result.empty:
        sessions = df.loc[df["level"].astype(str).str.upper() == level.upper(), "session"].unique()
        raise ValueError(
            f"Không tìm thấy đợt thi khớp level={level!r} session={session!r}.\n"
            f"Các đợt có sẵn cho {level}: {list(sessions)}"
        )
    return result
