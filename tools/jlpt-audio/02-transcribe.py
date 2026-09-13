# Bước 2 của pipeline audio: nhận dạng giọng nói để lấy MỐC THỜI GIAN, không phải để lấy chữ.
#
# Chạy:  python tools/jlpt-audio/02-transcribe.py [--only n3-2025-07] [--model large-v3-turbo] [--force]
#
# Đầu vào : data/_audio_build/dist/<examId>.<hash8>.mp3   (từ bước 1)
# Đầu ra  : data/_audio_build/asr/<examId>.json
#
# Vì sao cần bước này: mỗi đề chỉ có MỘT file nghe ~40 phút, còn exam.json thì đã có sẵn
# transcript chuẩn của từng câu. Thứ còn thiếu là "câu 3 bắt đầu ở giây thứ bao nhiêu" và
# "dòng thoại thứ 2 nằm ở đâu". Whisper cho mốc thời gian từng từ; bước 3 sẽ khớp chuỗi từ đó
# với transcript chuẩn. Vì vậy chữ Whisper nghe sai vài chỗ cũng không sao — chỉ cần đủ giống
# để khớp được.
#
# Nhận dạng chạy trên CHÍNH file đã nén ở bước 1 (không phải file gốc) để mốc thời gian khớp
# với file người học tải về.

from __future__ import annotations

import argparse
import json
import re
import sys
import time
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[2]
BUILD_ROOT = REPO_ROOT / "data" / "_audio_build"
DIST_NAME = re.compile(r"^(?P<exam>[a-z0-9-]+)\.(?P<hash>[a-f0-9]{8})\.mp3$")


def list_dist() -> list[dict]:
    """Đọc thẳng thư mục dist thay vì build-report.json, để chạy được song song với bước 1."""
    out = []
    for p in sorted((BUILD_ROOT / "dist").glob("*.mp3")):
        m = DIST_NAME.match(p.name)
        if m:
            out.append({"examId": m["exam"], "hash": m["hash"], "path": p})
    return out


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--only", help="chỉ xử lý các examId này (phân tách bằng dấu phẩy)")
    # turbo: độ chính xác tiếng Nhật gần large-v3 nhưng nhanh hơn nhiều lần trên CPU —
    # đủ cho mục đích lấy mốc thời gian.
    parser.add_argument("--model", default="large-v3-turbo")
    parser.add_argument("--force", action="store_true")
    args = parser.parse_args()

    exams = list_dist()
    if args.only:
        wanted = set(args.only.split(","))
        exams = [e for e in exams if e["examId"] in wanted]
    if not exams:
        print("Không có file nào trong data/_audio_build/dist — chạy bước 1 trước: node tools/jlpt-audio/01-extract-transcode.mjs")
        return 1

    out_dir = BUILD_ROOT / "asr"
    out_dir.mkdir(parents=True, exist_ok=True)

    todo = []
    for exam in exams:
        out_path = out_dir / f"{exam['examId']}.json"
        if out_path.exists() and not args.force:
            cached = json.loads(out_path.read_text(encoding="utf-8"))
            if cached.get("audioHash") == exam["hash"] and cached.get("model") == args.model:
                print(f"{exam['examId']}  đã có (cùng hash + model), bỏ qua")
                continue
        todo.append((exam, out_path))
    if not todo:
        return 0

    # Nạp model sau khi đã chắc có việc để làm: lần đầu sẽ tải ~1.6 GB từ Hugging Face.
    from faster_whisper import WhisperModel

    model = WhisperModel(args.model, device="cpu", compute_type="int8")

    for exam, out_path in todo:
        started = time.time()
        segments, info = model.transcribe(
            str(exam["path"]),
            language="ja",
            word_timestamps=True,
            # Bài nghe có nhiều khoảng lặng 10–20 giây để thí sinh chọn đáp án. Không lọc VAD thì
            # Whisper hay "nghe ra" chữ trong khoảng lặng, làm lệch cả đoạn sau.
            vad_filter=True,
            vad_parameters={"min_silence_duration_ms": 700},
            # Tắt để một câu nghe nhầm không kéo theo cả chuỗi lặp lại ở các câu sau.
            condition_on_previous_text=False,
            beam_size=5,
        )

        seg_out = []
        for seg in segments:
            seg_out.append({
                "start": round(seg.start, 3),
                "end": round(seg.end, 3),
                "text": seg.text,
                "words": [
                    {"start": round(w.start, 3), "end": round(w.end, 3), "word": w.word, "p": round(w.probability, 3)}
                    for w in (seg.words or [])
                ],
            })
            done = seg.end / max(info.duration, 1)
            sys.stdout.write(f"\r{exam['examId']}  {done:6.1%}  ({time.time() - started:5.0f}s)")
            sys.stdout.flush()

        elapsed = time.time() - started
        out_path.write_text(
            json.dumps(
                {
                    "examId": exam["examId"],
                    "audioFile": exam["path"].name,
                    "audioHash": exam["hash"],
                    "model": args.model,
                    "durationSec": info.duration,
                    "elapsedSec": round(elapsed, 1),
                    "segments": seg_out,
                },
                ensure_ascii=False,
                indent=1,
            ),
            encoding="utf-8",
        )
        print(f"\r{exam['examId']}  xong trong {elapsed / 60:.1f} phút  ({info.duration / max(elapsed, 1):.1f}x thời gian thực)")

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
