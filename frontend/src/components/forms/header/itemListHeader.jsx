import React from 'react';
import StyledButton from '../../button/styledButton';
import CreateIcon from '../../icon/crud/createIcon';
import FetchIcon from '../../icon/crud/fetchIcon'
import DeleteIcon from '../../icon/crud/deleteIcon'

const ItemListHeader = ({ title, subtitle, itemName, openModal, fetchItems, handleDeleteSelected, }) => {
  return (
    <div className="grid grid-cols-2 flex-col items-center gap-2 md:justify-between mb-4">
      <div className="col-span-full sm:col-span-1 text-center md:text-start">
        <h1 className="text-2xl sm:text-3xl font-semibold leading-relaxed text-gray-900">
          {title}
        </h1>
        <p className="text-md sm:text-sm font-medium text-gray-500">
          {subtitle}
        </p>
      </div>

      <div className="grid grid-cols-12 col-span-full sm:col-span-1 flex-col items-center w-full gap-1 md:flex-row md:justify-end">
        <div className='col-span-full sm:col-span-5'>
          <StyledButton
            onClick={openModal}
            height="10"
          >
            <CreateIcon />
            Crear {itemName}
          </StyledButton>
        </div>
        <div className='col-span-full sm:col-span-2'>
          <StyledButton
            onClick={fetchItems}
            height="10"
          >
            <FetchIcon />
          </StyledButton>
        </div>
        <div className='col-span-full sm:col-span-5'>
          <StyledButton
            onClick={handleDeleteSelected}
            height="10"
            color="red"
          >
            <DeleteIcon />
            Eliminar {itemName}
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default ItemListHeader;
