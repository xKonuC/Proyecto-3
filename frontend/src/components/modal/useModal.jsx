import { useState } from 'react';

const useModal = (initialState = false, additionalFunctions = {}) => {
  const [modalOpen, setModalOpen] = useState(initialState);

  const openModal = () => {
    setModalOpen(true);
    additionalFunctions.onOpen && additionalFunctions.onOpen();
  };

  const closeModal = () => {
    setModalOpen(false);
    additionalFunctions.onClose && additionalFunctions.onClose();
  };

  return {
    modalOpen,
    openModal,
    closeModal,
  };
};

export default useModal;
