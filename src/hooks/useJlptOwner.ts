/**
 * Ai đang sở hữu dữ liệu JLPT trên máy này: id tài khoản, hoặc null khi học ở chế độ khách.
 *
 * Mọi màn hình JLPT đều lấy chủ sở hữu qua đây (thay vì tự đọc useAuth) để cùng một chỗ lo
 * luôn việc chuyển dữ liệu cũ sang cho tài khoản đầu tiên đăng nhập trên máy — xem
 * claimLegacyJlptData() trong src/lib/jlpt/db.ts.
 */

import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { claimLegacyJlptData } from '../lib/jlpt/db';

export interface JlptOwner {
  ownerId: string | null;
  /**
   * Tăng lên mỗi lần việc nhận dữ liệu JLPT cũ vừa hoàn tất VÀ có bản ghi được đổi chủ.
   *
   * Việc nhận chạy bất đồng bộ, còn các màn hình thì hỏi lịch sử làm bài ngay khi mở, nên
   * lượt hỏi đầu tiên vẫn thấy các bản ghi "vô chủ" và trả về rỗng. Đưa số này vào deps của
   * effect nạp dữ liệu để nạp lại đúng một lần sau khi đổi chủ xong — không có nó thì lịch
   * sử cũ chỉ hiện lại sau khi tải lại trang.
   */
  claimEpoch: number;
}

export function useJlptOwner(): JlptOwner {
  const { user } = useAuth();
  const ownerId = user?.id ?? null;
  const [claimEpoch, setClaimEpoch] = useState(0);

  useEffect(() => {
    if (!ownerId) return;
    let cancelled = false;
    claimLegacyJlptData(ownerId)
      .then((moved) => {
        // Chỉ đánh thức khi thật sự có gì đổi chủ — lần mở web thứ hai trở đi trả về 0 và
        // không việc gì phải nạp lại.
        if (!cancelled && moved > 0) setClaimEpoch((e) => e + 1);
      })
      // Thất bại (IndexedDB bị chặn) thì cũng chỉ mất phần dữ liệu cũ, không được làm hỏng
      // màn hình đang mở — nên nuốt lỗi ở đây là có chủ ý.
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [ownerId]);

  return { ownerId, claimEpoch };
}
