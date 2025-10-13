import React from 'react';
import StyledButton from '../../button/styledButton';
import CreateIcon from '../../icon/crud/createIcon';

const ItemListHeaderStage = ({
  title,
  subtitle,
  message,
  openModal,
}) => {
  return (
    <div className="grid grid-cols-2 flex-col items-center gap-2 md:flex-row md:justify-between mb-4">
      <div className="col-span-full sm:col-span-1 text-center md:text-start">
        <h1 className="text-2xl sm:text-3xl font-semibold leading-relaxed text-gray-900">
          {title}
        </h1>
        <p className="text-md sm:text-sm font-medium text-gray-500">
          {subtitle}
        </p>
      </div>

      <div className="col-span-full sm:col-span-1 flex flex-col items-center w-full gap-1 md:flex-row md:justify-end">
        <StyledButton
          onClick={openModal}
        >
          <CreateIcon />
          {message}
        </StyledButton>
      </div>
    </div>
  );
};

export default ItemListHeaderStage;
