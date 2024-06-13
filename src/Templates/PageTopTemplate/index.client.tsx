'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import dayjs from 'dayjs';

import Modal from '@/components/parts/Modal/index.client';
import { useCreateEventMutation } from '@/generates/graphql';
import { useYearMonth } from '@/hooks/YearMonthContext';
import { convertDateFromString, getClosestSunday } from '@/utils/date';
import {
  CustomApolloError,
  defaultFormattedErrors,
  extractErrorMessages,
  FormattedError,
} from '@/utils/error';

import DayList from './DayList/index.client';
import EventForm, { EventFormData } from './EventForm/index.client';

interface PageTopTemplateProps {
  searchParams?: { [key: string]: string | string[] | undefined };
}

const PageTopTemplate: React.FC<PageTopTemplateProps> = ({ searchParams }) => {
  const { setYear, setMonth } = useYearMonth();
  const [startDay, setStartDate] = useState<number>(dayjs().date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessages, setErrorMessages] = useState<FormattedError[]>(
    defaultFormattedErrors
  );
  const [createEventMutation] = useCreateEventMutation();

  const closestSunday = useMemo(() => {
    const weekParam = searchParams?.week;
    const date = weekParam ? convertDateFromString(weekParam as string) : null;
    return getClosestSunday(date || undefined);
  }, [searchParams]);

  useEffect(() => {
    setYear(closestSunday.year());
    setMonth(closestSunday.month() + 1);
    setStartDate(closestSunday.date());
  }, [closestSunday, setYear, setMonth]);

  const handleOpenModal = useCallback(() => setIsModalOpen(true), []);
  const handleCloseModal = useCallback(() => setIsModalOpen(false), []);

  const handleEventSubmit = useCallback(
    async (data: EventFormData) => {
      try {
        await createEventMutation({
          variables: {
            params: {
              ...data,
            },
          },
        });
        handleCloseModal();
      } catch (error) {
        setErrorMessages(
          extractErrorMessages(error as unknown as CustomApolloError)
        );
      }
    },
    [createEventMutation, handleCloseModal]
  );

  return (
    <>
      <DayList onOpenModal={handleOpenModal} startDay={startDay} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} width="30%">
        <EventForm onSubmit={handleEventSubmit} errorMessages={errorMessages} />
      </Modal>
    </>
  );
};

export default PageTopTemplate;
