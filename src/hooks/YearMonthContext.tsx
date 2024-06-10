'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface YearMonthContextProps {
  year: number;
  month: number;
  setYear: (year: number) => void;
  setMonth: (month: number) => void;
}

const YearMonthContext = createContext<YearMonthContextProps | undefined>(undefined);

export const YearMonthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  return (
    <YearMonthContext.Provider value={{ year, month, setYear, setMonth }}>
      {children}
    </YearMonthContext.Provider>
  );
};

export const useYearMonth = () => {
  const context = useContext(YearMonthContext);
  if (context === undefined) {
    throw new Error('useYearMonth must be used within a YearMonthProvider');
  }
  return context;
};
