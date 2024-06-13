"use client";

import React, { useState, useEffect, useCallback } from 'react';
import DatePicker from 'react-datepicker';
import { useForm, SubmitHandler } from 'react-hook-form';
import 'react-datepicker/dist/react-datepicker.css';

import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import weekday from 'dayjs/plugin/weekday';

import 'dayjs/locale/ja';
import { defaultFormattedErrors, FormattedError } from '@/utils/error';

dayjs.extend(weekday);
dayjs.extend(localeData);
dayjs.locale('ja');

export interface EventFormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description: string;
}

interface EventFormProps {
  onSubmit: (data: EventFormData) => void;
  errorMessages: FormattedError[];
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, errorMessages }) => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm<EventFormData>();
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const now = dayjs();
    const nearest15Minutes = now.minute(Math.ceil(now.minute() / 15) * 15).second(0);
    const start = nearest15Minutes.format('HH:mm');
    const end = nearest15Minutes.add(30, 'minute').format('HH:mm');
    setValue('date', dayjs(new Date()).format('YYYY-MM-DD'));
    setValue('startTime', start);
    setValue('endTime', end);
  }, [setValue]);

  const handleToggleCalendar = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;

    if (target.classList.contains('react-datepicker__navigation-icon')) {
      return;
    }

    setIsOpen(prev => !prev);
  }, []);

  const onSubmitHandler: SubmitHandler<EventFormData> = (data) => {
    onSubmit(data);
  };

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    if (date) {
      setValue('date', dayjs(date).format('YYYY-MM-DD'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
      <div className="mb-4">
        <input
          type="text"
          placeholder="タイトルを追加"
          {...register('title', { required: 'タイトルは必須です' })}
          className="w-full p-2 border-b-2 border-gray-300 focus:outline-none"
        />
        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
      </div>
      <div className="mb-4 flex items-center space-x-4">
        <div className="flex-1"  onClick={handleToggleCalendar}>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="M月d日"
            className="w-full p-2 hover:bg-gray-200 transition duration-300"
            placeholderText="日付を選択"
            onClickOutside={() => setIsOpen(false)}
            open={isOpen}
          />
          {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
        </div>
        <div className="flex-1">
          <div className="flex space-x-2">
            <input
              type="time"
              {...register('startTime', { required: '開始時間は必須です' })}
              list="time-options"
              className="w-1/2 p-2 hover:bg-gray-200 transition duration-300"
            />
            <span className="text-center self-center">-</span>
            <input
              type="time"
              {...register('endTime', { required: '終了時間は必須です' })}
              list="time-options"
              className="w-1/2 p-2 hover:bg-gray-200 transition duration-300"
            />
          </div>
          <datalist id="time-options">
            {Array.from({ length: 96 }, (_, i) => {
              const time = dayjs().startOf('day').add(i * 15, 'minute').format('HH:mm');
              return <option key={i} value={time}>{time}</option>;
            })}
          </datalist>
        </div>
      </div>
      <div className="mb-4">
        <textarea
          {...register('description')}
          className="w-full p-2 hover:bg-gray-200 transition duration-300"
          placeholder="説明を追加"
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>
      {errorMessages !== defaultFormattedErrors && (
        <div className="mb-4">
          {errorMessages.map(({ attribute, messages }) =>
            messages.map((errorMessage, index) =>
              <span key={`${attribute}-${index}`} className="text-red-500 text-sm block">{errorMessage}</span>
            )
          )}
        </div>
      )}
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">保存</button>
    </form>
  );
};

export default EventForm;
