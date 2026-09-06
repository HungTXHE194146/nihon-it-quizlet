/**
 * Ai đang sở hữu dữ liệu JLPT trên máy này: id tài khoản, hoặc null khi học ở chế độ khách.
 *
 * Mọi màn hình JLPT đều lấy chủ sở hữu qua đây (thay vì tự đọc useAuth) để cùng một chỗ lo
 * luôn việc chuyển dữ liệu cũ sang cho tài khoản đầu tiên đăng nhập trên máy — xem
 * claimLegacyJlptData() trong src/lib/jlpt/db.ts.
 */

import { useEffect } from 'react';
import { useAuth } from './useAuth';
import { claimLegacyJlptData } from '../lib/jlpt/db';

export function useJlptOwner(): string | null {
  const { user } = useAuth();
  const ownerId = user?.id ?? null;

  useEffect(() => {
    if (!ownerId) return;
    // Thất bại (IndexedDB bị chặn) thì cũng chỉ mất phần dữ liệu cũ, không được làm hỏng
    // màn hình đang mở — nên nuốt lỗi ở đây là có chủ ý.
    claimLegacyJlptData(ownerId).catch(() => {});
  }, [ownerId]);

  return ownerId;
}
