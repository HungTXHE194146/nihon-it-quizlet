"""
Test cho extract_exam.py bằng văn bản TỰ GÕ mô phỏng cấu trúc đề JLPT — không lấy từ
bất kỳ đề thi thật nào. An toàn để commit vì không chứa nội dung có bản quyền.

Đây là lưới an toàn khi sửa thuật toán tách câu, KHÔNG phải bằng chứng nó đúng với
PDF thật — PDF thật còn phải test riêng bằng inspect_pdf.py + build_exam.py --dry-run.

Chạy: python3 -m pytest tools/jlpt-import/test_extract_exam.py -v
  (hoặc chạy trực tiếp: python3 tools/jlpt-import/test_extract_exam.py)
"""

from __future__ import annotations

from extract_exam import split_by_mondai, split_questions_in_block, _check_run_for_gaps

FAKE_EXAM_TEXT = """N3 7/2025

文字・語彙

問題1 ＿＿のことばの読み方として最もよいものを、1・2・3・4から一つ選びなさい。

1 急に涙が出てしまいました。
1 なみだ 2 あせ 3 せき 4 くしゃみ

2 けがは完全に治りました。
1 かんぜん 2 かんたん 3 けんぜん 4 けんたん

3 雨で地面がぬれている。
1 ちめい 2 ちめん 3 じめい 4 じめん

4 お金はあの箱に移したほうがいいですか。
1 もどした 2 かくした 3 このした 4 うつした

5 ゆっくり呼吸をしてください。
1 こきょう 2 こきゅう 3 こうきゅう 4 こうきょう

6 ここに身長を書いてください。
1 せんちょう 2 しんちょう 3 じんちょう 4 ぜんちょう

7 前田さんは困っているようだ。
1 まよって 2 おこって
3 こまって 4 だまって

問題2 ダミー見出し。
1 テスト文
1 あ 2 い 3 う 4 え
"""


def test_tach_dung_so_luong_mondai():
    blocks = split_by_mondai(FAKE_EXAM_TEXT)
    assert len(blocks) == 2
    assert blocks[0].mondai_number == 1
    assert blocks[1].mondai_number == 2


def test_huong_dan_khong_lan_vao_cau_hoi():
    blocks = split_by_mondai(FAKE_EXAM_TEXT)
    assert blocks[0].instruction.endswith("選びなさい。")
    # Quan trọng: hướng dẫn chứa "1・2・3・4" — thuật toán không được hiểu nhầm
    # đây là cụm đáp án của một câu hỏi ảo.
    qs = split_questions_in_block(blocks[0].body)
    assert qs[0].item_number == 1
    assert qs[0].stem == "急に涙が出てしまいました。"


def test_tach_dung_bon_phuong_an_khong_dinh_so_thua():
    blocks = split_by_mondai(FAKE_EXAM_TEXT)
    qs = split_questions_in_block(blocks[0].body)
    q1 = qs[0]
    assert q1.choices == ["なみだ", "あせ", "せき", "くしゃみ"]
    # Bug đã từng có: mỗi phương án dính thừa số thứ tự của phương án kế tiếp
    # (vd "なみだ 2" thay vì "なみだ"). Assert này canh gác cho lỗi đó không quay lại.
    for c in q1.choices:
        assert not c[-1].isdigit(), f"phương án dính thừa số ở cuối: {c!r}"


def test_phuong_an_xuong_dong_giua_cau_van_tach_dung():
    """Câu 7 trong dữ liệu mẫu có phương án 2 xuống dòng trước khi tới số 3 —
    mô phỏng layout lưới 2x2 khi một phương án dài phải wrap."""
    blocks = split_by_mondai(FAKE_EXAM_TEXT)
    qs = split_questions_in_block(blocks[0].body)
    q7 = next(q for q in qs if q.item_number == 7)
    assert q7.choices == ["まよって", "おこって", "こまって", "だまって"]


def test_khong_lan_giua_hai_khoi_mondai():
    blocks = split_by_mondai(FAKE_EXAM_TEXT)
    qs2 = split_questions_in_block(blocks[1].body)
    assert len(qs2) == 1
    assert qs2[0].choices == ["あ", "い", "う", "え"]


def test_canh_bao_khi_thieu_mot_so_mondai():
    """Lỗi có thật gặp trên file mẫu N3 7/2010: đề thiếu hẳn dòng '問題4', câu của nó
    dính vào 問題3. Không tự sửa được (không có dữ liệu để suy ra), nhưng PHẢI cảnh báo
    to thay vì lặng lẽ trả về kết quả sai."""
    import io
    import contextlib

    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        _check_run_for_gaps([1, 2, 3, 5])
    out = buf.getvalue()
    assert "THIẾU TIÊU ĐỀ" in out
    assert "問題[4]" in out


def test_khong_canh_bao_khi_day_du():
    import io
    import contextlib

    buf = io.StringIO()
    with contextlib.redirect_stdout(buf):
        _check_run_for_gaps([1, 2, 3, 4, 5])
    assert buf.getvalue() == ""


if __name__ == "__main__":
    # Cho phép chạy trực tiếp bằng `python3 test_extract_exam.py` khi máy chưa có pytest.
    import sys
    import traceback

    tests = [v for k, v in list(globals().items()) if k.startswith("test_")]
    failed = 0
    for t in tests:
        try:
            t()
            print(f"✅ {t.__name__}")
        except AssertionError:
            failed += 1
            print(f"❌ {t.__name__}")
            traceback.print_exc()
    print(f"\n{len(tests) - failed}/{len(tests)} test qua")
    sys.exit(1 if failed else 0)
