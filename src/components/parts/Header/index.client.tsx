'use client';

import React, { useCallback, useMemo, useState, useRef } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './styles.css';

import { useYearMonth } from '@/hooks/YearMonthContext';

const Header: React.FC = () => {
  const { year, month, setYear, setMonth } = useYearMonth();
  const selectedDate = useMemo(() => new Date(year, month - 1), [year, month]);
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef(null);

  const handleDateChange = useCallback((date: Date) => {
    setYear(date.getFullYear());
    setMonth(date.getMonth() + 1);
    setIsOpen(false);  // カレンダーを閉じる
  }, [setYear, setMonth]);

  const handleToggleCalendar = () => {
    setIsOpen(prev => !prev);
  };

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
          showMonthYearPicker
          className="font-sans text-22px text-rgb-60-64-67 w-115px cursor-pointer custom-datepicker-input"
          open={isOpen}
          onClickOutside={() => setIsOpen(false)}  // カレンダー外をクリックしたら閉じる
        />
        <span className="text-gray-112-117-122 text-11px">▼</span>
      </div>
    </header>
  );
};

export default Header;
