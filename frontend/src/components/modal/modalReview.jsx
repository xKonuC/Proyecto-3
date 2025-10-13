import React from 'react';

const ModalReview = ({ isOpen, children, pdfUrl }) => {
  return (
    <>
      {/* Contenedor del modal */}
      <div className={`fixed inset-0 bg-white h-screen min-w-screen flex justify-center items-center z-40 transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
        {/* Contenido del modal */}
        <div className='w-4/6 h-full flex'>
          {pdfUrl && (
            <iframe
              src={`${import.meta.env.VITE_VIEW_FILE}/${pdfUrl}`}
              style={{ width: '100%', height: '100%' }}
            ></iframe>
          )}
        </div>
        <div className='w-2/6 h-full'>
          {children}
        </div>
      </div>
    </>
  );
};

export default ModalReview;
