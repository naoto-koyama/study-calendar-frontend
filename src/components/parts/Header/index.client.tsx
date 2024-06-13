'use client';

import React, { useCallback, useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

import dayjs from 'dayjs';
import { useSearchParams, useRouter } from 'next/navigation';

import { useYearMonth } from '@/hooks/YearMonthContext';

const Header: React.FC = () => {
  const { year, month, setYear, setMonth } = useYearMonth();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date(year, month - 1));
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setSelectedDate(new Date(year, month - 1));
  }, [year, month]);

  const handleDateChange = useCallback((date: Date) => {
    setSelectedDate(date);
    setYear(dayjs(date).year());
    setMonth(dayjs(date).month() + 1);
    setIsOpen(false);

    // クエリパラメータの更新
    const week = dayjs(date).format('YYYY-M-D');
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('week', week);
    router.push(`?${newSearchParams.toString()}`);
  }, [setYear, setMonth, searchParams, router]);

  const handleToggleCalendar = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('react-datepicker__navigation-icon')) {
      return;
    }

    setIsOpen(prev => !prev);
  }, []);

  return (
    <header className="bg-white border-b border-gray-300 flex items-center p-4 relative">
      <div className="flex items-center mr-4">
        <img src="/images/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-22px text-gray-112-117-122">カレンダー</h1>
      </div>
      <div className="flex items-center cursor-pointer" onClick={handleToggleCalendar}>
        <DatePicker
          ref={datePickerRef}
          selected={selectedDate}
          onChange={handleDateChange}
          dateFormat="yyyy年 M月"
          className="font-sans text-22px text-rgb-60-64-67 w-124px cursor-pointer custom-datepicker-input"
          onClickOutside={() => setIsOpen(false)} // カレンダー外をクリックしたら閉じる
          open={isOpen}
        />
        <span className="text-gray-112-117-122 text-11px">▼</span>
      </div>
    </header>
  );
};

export default Header;
