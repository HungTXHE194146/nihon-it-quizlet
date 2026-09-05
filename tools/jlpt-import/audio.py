"""
Xử lý file âm thanh phần 聴解: giải nén rar nếu cần, đo thời lượng.

Không phụ thuộc cấu trúc PDF nên chạy được ngay, không cần file mẫu để chỉnh.
"""

from __future__ import annotations

import subprocess
import shutil
from pathlib import Path

from mutagen.mp3 import MP3
from mutagen import MutagenError


def find_audio_file(folder: Path) -> Path | None:
    """Tìm đúng 1 file âm thanh (mp3 hoặc rar) trong thư mục một đợt thi."""
    candidates = [
        p for p in folder.iterdir()
        if p.suffix.lower() in (".mp3", ".rar") and p.is_file()
    ]
    if len(candidates) != 1:
        return None
    return candidates[0]


def ensure_mp3(audio_path: Path, work_dir: Path) -> Path:
    """Trả về đường dẫn tới file .mp3 thật, giải nén rar nếu cần.

    `work_dir` nên là một thư mục con của output/ (đã gitignore) — file mp3 gốc không
    được nằm lẫn vào bất cứ đâu có thể vô tình bị `git add`.
    """
    if audio_path.suffix.lower() == ".mp3":
        return audio_path

    if audio_path.suffix.lower() != ".rar":
        raise ValueError(f"Không nhận diện được định dạng âm thanh: {audio_path}")

    unrar_bin = shutil.which("unrar") or shutil.which("unrar-free")
    if not unrar_bin:
        raise RuntimeError(
            "Không tìm thấy lệnh `unrar`. Cài bằng: sudo apt-get install unrar-free "
            "(hoặc unrar bản đầy đủ nếu unrar-free không đọc được file .rar cụ thể này)."
        )

    work_dir.mkdir(parents=True, exist_ok=True)
    subprocess.run(
        [unrar_bin, "x", "-y", str(audio_path), str(work_dir) + "/"],
        check=True,
        capture_output=True,
    )

    mp3s = list(work_dir.rglob("*.mp3"))
    if len(mp3s) != 1:
        raise RuntimeError(
            f"Giải nén {audio_path} ra {len(mp3s)} file .mp3 (mong đợi đúng 1). "
            f"Kiểm tra thủ công thư mục {work_dir}."
        )
    return mp3s[0]


def audio_duration_seconds(mp3_path: Path) -> float:
    try:
        return MP3(mp3_path).info.length
    except MutagenError as e:
        raise RuntimeError(f"Không đọc được thời lượng của {mp3_path}: {e}") from e
