import React from 'react';
import { FaFilePdf } from 'react-icons/fa';

const PreviewModal = ({ isOpen, onClose, pdfUrl, reportTitle }) => {
  if (!isOpen || !pdfUrl) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50 flex justify-center items-center">

      <div className="bg-white p-6 rounded-lg shadow-2xl w-11/12 max-w-5xl max-h-[85vh] h-full flex flex-col">
        <div className="flex justify-between items-center border-b pb-3 mb-4 flex-shrink-0">
          <h2 className="text-2xl font-bold text-orange-main flex items-center space-x-2">
            <FaFilePdf className="text-red-500" />
            <span>Vista Previa: {reportTitle}</span>
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl font-semibold">
            &times;
          </button>
        </div>
        
        <div className="flex-grow overflow-hidden border p-1 bg-gray-100">
          
          <iframe 
            src={pdfUrl} 
            title={`Vista Previa del Reporte ${reportTitle}`}
            width="100%" 
            height="100%"
            style={{ border: 'none' }}
          >
            Tu navegador no soporta iframes.
          </iframe>
        </div>

        <div className="mt-4 flex justify-end flex-shrink-0">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition duration-200"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModal;