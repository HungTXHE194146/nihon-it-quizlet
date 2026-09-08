import React from 'react';

/**
 * Thân câu hỏi JLPT, gạch chân đúng đoạn mà đề chỉ định (`stemUnderline`).
 *
 * Tách riêng vì cả phòng thi lẫn sổ tay lỗi đều phải hiện câu hỏi y hệt nhau — người học
 * mở lại một câu trong sổ tay phải thấy đúng thứ mình đã thấy lúc làm bài, kể cả chỗ gạch
 * chân (với 問題 dạng 言い換え/用法 thì chỗ gạch chân CHÍNH LÀ đề bài).
 */
export const StemText: React.FC<{ stem?: string; underline?: [number, number] }> = ({
  stem,
  underline,
}) => {
  if (!stem) return null;
  if (!underline) return <span>{stem}</span>;
  const [from, to] = underline;
  if (from < 0 || to > stem.length || from >= to) return <span>{stem}</span>;
  return (
    <span>
      {stem.slice(0, from)}
      <span className="underline decoration-2 decoration-indigo-500 font-black">
        {stem.slice(from, to)}
      </span>
      {stem.slice(to)}
    </span>
  );
};
