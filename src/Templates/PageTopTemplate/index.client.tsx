"use client";

import { useState } from 'react';

import Modal from '@/components/parts/Modal/index.client';

import DayList from './DayList/index.client';
import EventForm, { EventFormData } from './EventForm/index.client';

const PageTopTemplate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

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
      <DayList onOpenModal={handleOpenModal} />
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>予定を登録</h2>
        <EventForm onSubmit={handleEventSubmit} />
      </Modal>
    </>
  );
};

export default PageTopTemplate;
