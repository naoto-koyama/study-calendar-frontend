import React, { useMemo } from 'react';

import { useYearMonth } from '@/hooks/YearMonthContext';

import { TodayInfo } from '../index.client';


interface DayListItemProps {
  day: string;
  index: number;
  todayInfo: TodayInfo;
  startDate: number;
}

const DayListItem: React.FC<DayListItemProps> = ({ day, index, todayInfo, startDate }) => {
  const { year, month } = useYearMonth();
  const currentDate = useMemo(() => {
    return new Date(year, month - 1, startDate + index);
  }, [year, month, startDate, index]);

  const isToday = useMemo(() => {
    return (
      todayInfo.year === currentDate.getFullYear() &&
      todayInfo.month === currentDate.getMonth() + 1 &&
      todayInfo.date === currentDate.getDate()
    );
  }, [todayInfo, currentDate]);

  return (
    <li className="flex flex-col items-center pt-2 text-gray-112-117-122 w-1/7">
      <span className={`font-medium text-11px mb-1 ${isToday ? 'text-blue-500' : ''}`}>{day}</span>
      <span className={`text-26px ${isToday ? 'bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center' : ''}`}>{currentDate.getDate()}</span>
    </li>
  );
};

export default DayListItem;
