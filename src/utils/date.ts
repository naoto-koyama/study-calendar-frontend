import dayjs, { Dayjs } from 'dayjs';

/**
 * 日付文字列からDateオブジェクトを生成する関数
 * @param dateString 日付文字列（例: "2024/6/5"）
 * @returns Dayjsオブジェクト
 */
export const convertDateFromString = (dateString?: string): Dayjs | null => {
  if (!dateString) {
    return null;
  }

  const date = dayjs(dateString, 'YYYY/M/D', true);
  return date.isValid() ? date : null;
};

/**
 * 今日の日付から最も近い日曜日の日付を取得する関数
 * @returns Dayjsオブジェクト
 */
export const getClosestSunday = (date?: Dayjs): Dayjs => {
  const today = date ? dayjs(date) : dayjs();
  const dayOfWeek = today.day();
  const closestSunday = today.subtract(dayOfWeek, 'day');
  return closestSunday;
};
