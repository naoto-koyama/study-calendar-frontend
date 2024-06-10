"use client";

import React, { useState } from 'react';

import DayListItem from '@/Templates/PageTopTemplate/DayList/DayListItem/index.client';

interface DayListProps {
  onOpenModal: () => void,
}

export interface TodayInfo {
  year: number;
  month: number;
  date: number;
}

const getTodayInfo = (): TodayInfo => {
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1, // 月は0から始まるので+1します
    date: today.getDate(),
  };
};

const weekdays = ['日', '月', '火', '水', '木', '金', '土'];
const startDate = 9;

const DayList: React.FC<DayListProps> = ({ onOpenModal }) => {
  const [todayInfo] = useState<TodayInfo>(getTodayInfo());

  return (
    <div className="flex w-full">
      <div className="relative flex items-center justify-center w-16 h-16 mt-3 ml-2 group">
        <button className="flex items-center justify-center w-full h-full rounded-full border bg-opacity-50 bg-white"
                style={{ boxShadow: '0 1px 2px 0 rgba(60, 64, 67, .3), 0 1px 3px 1px rgba(60, 64, 67, .15)'}}
                onClick={onOpenModal}
        >
          <svg width="36" height="36" viewBox="0 0 36 36">
            <path fill="#34A853" d="M16 16v14h4V20z"></path>
            <path fill="#4285F4" d="M30 16H20l-4 4h14z"></path>
            <path fill="#FBBC05" d="M6 16v4h10l4-4z"></path>
            <path fill="#EA4335" d="M20 16V6h-4v14z"></path>
            <path fill="none" d="M0 0h36v36H0z"></path>
          </svg>
        </button>
        <span className="absolute top-full mt-2 p-1 hidden text-center text-sm text-white bg-black group-hover:flex text-white bg-gray-600">作成</span>
      </div>
      <ul className="flex w-full">
        {weekdays.map((day, index) => (
          <DayListItem
            key={index}
            day={day}
            index={index}
            startDate={startDate}
            todayInfo={todayInfo}
          />
        ))}
      </ul>
    </div>
  );
};

export default DayList;
