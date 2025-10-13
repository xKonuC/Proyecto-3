import React from 'react';

const PageHeader = ({ title, subtitle }) => {
  return (
    <div>
      <h2 className="text-3xl font-bold tracking-tight text-center sm:text-5xl text-orange-main">{title}</h2>
      <p className="max-w-5xl mx-auto mt-4 leading-relaxed text-sm sm:text-lg text-justify text-gray-500">{subtitle}</p>
    </div>
  );
};

export default PageHeader;
