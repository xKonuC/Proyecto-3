import React from 'react';

const PageButton = ({ page, onClick, disabled }) => (
    <button
        onClick={onClick}
        disabled={disabled}
        className={`inline-flex items-center justify-center w-8 h-8 py-0 border rounded-lg shadow-md ${disabled
            ? 'bg-orange-main text-white'
            : 'hover:bg-white hover:border-orange-main hover:text-orange-main'
            }`}
    >
        <span className="sr-only">{`Ir a la página ${page}`}</span>
        {page}
    </button>
);

export default PageButton;