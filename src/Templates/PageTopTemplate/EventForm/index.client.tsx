"use client";

import { useForm, SubmitHandler } from 'react-hook-form';

export interface EventFormData {
  title: string;
  date: string;
  description: string;
}

const EventForm = ({ onSubmit }: { onSubmit: (data: EventFormData) => void }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<EventFormData>();

  const onSubmitHandler: SubmitHandler<EventFormData> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">タイトル</label>
        <input
          type="text"
          {...register('title', { required: 'タイトルは必須です' })}
          className="w-full p-2 border rounded"
        />
        {errors.title && <span className="text-red-500 text-sm">{errors.title.message}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">日付</label>
        <input
          type="date"
          {...register('date', { required: '日付は必須です' })}
          className="w-full p-2 border rounded"
        />
        {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2">説明</label>
        <textarea
          {...register('description', { required: '説明は必須です' })}
          className="w-full p-2 border rounded"
        />
        {errors.description && <span className="text-red-500 text-sm">{errors.description.message}</span>}
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">保存</button>
    </form>
  );
};

export default EventForm;
