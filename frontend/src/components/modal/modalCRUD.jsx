import React from 'react';

const ModalCRUD = ({ isOpen, children }) => {
  return (
    <>
      {/* Fondo oscurecido */}
      <div
        className={`fixed inset-0 z-40 bg-black opacity-0 transition-opacity duration-500 ease-in-out ${isOpen ? 'opacity-70' : 'pointer-events-none opacity-0'}`}
        aria-hidden="true"
      ></div>
      {/* Contenedor del modal */}
      <div className={`fixed inset-0 flex justify-center items-center z-40 w-full h-full transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        {/* Contenido del modal */}
          {children}
      </div>
    </>
  );
};

export default ModalCRUD;
