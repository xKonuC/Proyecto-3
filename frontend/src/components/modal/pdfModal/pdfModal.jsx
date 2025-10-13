import React from 'react';

const PdfModal = ({ isOpen, onClose, url }) => {
  const handleClose = () => {
    onClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center overflow-x-hidden bg-zinc-900/70 outline-none focus:outline-none"
      onClick={handleClose}
    >
      <div
        className="m-20 p-0 w-3/4 h-3/4 rounded-xl shadow-md bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <iframe
          src={url}
          title="PDF"
          width="100%"
          height="100%"
          allow="autoplay"
        ></iframe>
      </div>
    </div>
  );
};

export default PdfModal;
