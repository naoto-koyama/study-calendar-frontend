'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { useYearMonth } from '@/hooks/YearMonthContext';

interface FormValues {
  year: number;
  month: number;
}

const Header: React.FC = () => {
  const { year, month, setYear, setMonth } = useYearMonth();
  const { register, watch } = useForm<FormValues>({
    defaultValues: {
      year,
      month,
    },
  });

  const watchedYear = watch('year');
  const watchedMonth = watch('month');

  useEffect(() => {
    if (watchedYear) {
      setYear(Number(watchedYear));
    }
  }, [watchedYear, setYear]);

  useEffect(() => {
    if (watchedMonth) {
      setMonth(Number(watchedMonth));
    }
  }, [watchedMonth, setMonth]);

  return (
    <header className="bg-white border-b border-gray-300 flex items-center justify-between p-4 relative">
      <div className="flex items-center">
        <img src="/images/logo.png" alt="Logo" className="w-10 h-10 mr-2" />
        <h1 className="text-22px text-gray-112-117-122">カレンダー</h1>
      </div>
      <div className="flex items-center">
        <select {...register('year')} className="mr-2">
          {Array.from({ length: 10 }, (_, i) => {
            const yearOption = new Date().getFullYear() - 5 + i;
            return (
              <option key={yearOption} value={yearOption}>
                {yearOption}
              </option>
            );
          })}
        </select>
        <select {...register('month')}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
    </header>
  );
};

export default Header;
