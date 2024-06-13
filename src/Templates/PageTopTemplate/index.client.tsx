"use client";

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import dayjs from 'dayjs';

import Modal from '@/components/parts/Modal/index.client';
import { useYearMonth } from '@/hooks/YearMonthContext';
import { convertDateFromString, getClosestSunday } from '@/utils/date';

import DayList from './DayList/index.client';
import EventForm, { EventFormData } from './EventForm/index.client';

interface PageTopTemplateProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const PageTopTemplate: React.FC<PageTopTemplateProps> = ({ searchParams }) => {
  const { setYear, setMonth } = useYearMonth();
  const [startDay, setStartDate] = useState<number>(dayjs().date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closestSunday = useMemo(() => {
    const weekParam = searchParams?.week;
    const date = weekParam ? convertDateFromString(weekParam as string) : null;
    return getClosestSunday(date || undefined);
  }, [searchParams]);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  useEffect(() => {
    setYear(closestSunday.year());
    setMonth(closestSunday.month() + 1);
    setStartDate(closestSunday.date());
  }, [closestSunday, setYear, setMonth]);

  const handleEventSubmit = async (data: EventFormData) => {
    try {
      alert('Event data: ' + JSON.stringify(data));
      // GraphQL mutationの呼び出しをここに追加
      // await addEvent({ variables: data });
      handleCloseModal();
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  return (
    <>
      <DayList onOpenModal={handleOpenModal} startDay={startDay} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} width='30%'>
        <EventForm onSubmit={handleEventSubmit} />
      </Modal>
    </>
  );
};

export default PageTopTemplate;
