#!/usr/bin/env python3
"""
Công cụ chẩn đoán: in ra cấu trúc thật của một PDF đề thi để xây dựng extract_exam.py.

KHÔNG sinh dữ liệu câu hỏi. Chỉ dump text + vị trí để biết:
  - Thứ tự đọc của text layer có đúng như mắt nhìn không (PDF hay bị đảo cột).
  - Số câu (ô vuông "1", "2"...) có tách được bằng regex đơn giản không.
  - Gạch chân dưới chữ cần đọc có để lại "line"/"rect" trong PDF hay chỉ là hình vẽ.

Chạy:
    python3 tools/jlpt-import/inspect_pdf.py duong/dan/exam.pdf --page 1
"""

from __future__ import annotations

import argparse
import sys

import pdfplumber


def dump_page(page: "pdfplumber.page.Page", page_no: int) -> None:
    print(f"\n{'=' * 70}\nTRANG {page_no}  (kích thước {page.width:.0f} x {page.height:.0f})\n{'=' * 70}")

    print("\n--- extract_text(layout=True) — cách mắt người sẽ đọc ---")
    text = page.extract_text(layout=True) or "(rỗng)"
    print(text[:3000])
    if len(text) > 3000:
        print(f"... (còn {len(text) - 3000} ký tự, đã cắt bớt)")

    print("\n--- extract_words() — 20 từ đầu, kèm toạ độ ---")
    words = page.extract_words(use_text_flow=False)
    for w in words[:20]:
        print(f"  '{w['text']}'  x0={w['x0']:.1f} x1={w['x1']:.1f} top={w['top']:.1f}")
    print(f"  ... tổng {len(words)} từ trên trang này")

    print("\n--- lines / rects — ứng viên gạch chân ---")
    print(f"  lines: {len(page.lines)}  |  rects: {len(page.rects)}")
    for ln in page.lines[:10]:
        print(
            f"  line: x0={ln['x0']:.1f} x1={ln['x1']:.1f} "
            f"top={ln['top']:.1f} bottom={ln['bottom']:.1f}"
        )

    print("\n--- ảnh debug layout (giúp nhìn bằng mắt nếu cần) ---")
    try:
        img = page.to_image(resolution=150)
        out = f"/tmp/jlpt-inspect-page-{page_no}.png"
        img.save(out)
        print(f"  đã lưu: {out}")
    except Exception as e:  # môi trường có thể thiếu poppler render backend
        print(f"  (bỏ qua, không render được ảnh: {e})")


def main() -> None:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("pdf_path")
    ap.add_argument("--page", type=int, default=None, help="Chỉ xem 1 trang (1-based). Mặc định: tất cả.")
    args = ap.parse_args()

    with pdfplumber.open(args.pdf_path) as pdf:
        print(f"Tổng số trang: {len(pdf.pages)}")
        pages = (
            [pdf.pages[args.page - 1]] if args.page else pdf.pages
        )
        page_nums = [args.page] if args.page else range(1, len(pdf.pages) + 1)
        for page, no in zip(pages, page_nums):
            dump_page(page, no)


if __name__ == "__main__":
    try:
        main()
    except FileNotFoundError as e:
        print(f"Không tìm thấy file: {e}", file=sys.stderr)
        sys.exit(1)
