import React from 'react';

const PrevPageButton = ({ onClick, disabled }) => (
    <button
        onClick={onClick}
        className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-lg shadow-md rtl:rotate-180"
        disabled={disabled}
    >
        <span className="sr-only">Página anterior</span>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-3 w-3"
            viewBox="0 0 20 20"
            fill="currentColor"
        >
            <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
            />
        </svg>
    </button>
);

export default PrevPageButton;