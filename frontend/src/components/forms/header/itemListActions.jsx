import React from 'react';
import StyledButton from '../../button/styledButton';
import CreateIcon from '../../icon/crud/createIcon';
import FetchIcon from '../../icon/crud/fetchIcon';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

// Componente para las acciones de la lista de ítems (crear, actualizar, habilitar, deshabilitar)
const ItemListActions = ({
  title, // Título de la sección
  subtitle, // Subtítulo de la sección
  itemName, // Nombre del ítem (singular) para los botones de acción
  openModal, // Función para abrir el modal de creación
  fetchItems, // Función para obtener/recargar los ítems
  handleEnableSelected, // Función para habilitar ítems seleccionados
  handleDisableSelected, // Función para deshabilitar ítems seleccionados
}) => {
  return (
    <div className="grid grid-cols-5 flex-col items-center gap-2 md:justify-between mb-4">
      {/* Título y subtítulo */}
      <div className="col-span-full sm:col-span-2 text-center md:text-start">
        <h1 className="text-2xl sm:text-3xl font-semibold leading-relaxed text-gray-900">
          {title}
        </h1>
        <p className="text-md sm:text-sm font-medium text-gray-500">
          {subtitle}
        </p>
      </div>

      {/* Botones de acción */}
      <div className="grid grid-cols-10 col-span-full sm:col-span-3 flex-col items-center w-full gap-1 md:flex-row md:justify-end">
        {/* Botón para crear un nuevo ítem */}
        <div className='col-span-full sm:col-span-3'>
          <StyledButton onClick={openModal} height="10">
            <CreateIcon />
            Crear {itemName}
          </StyledButton>
        </div>
        {/* Botón para recargar/obtener los ítems */}
        <div className='col-span-full sm:col-span-1'>
          <StyledButton onClick={fetchItems} height="10">
            <FetchIcon />
          </StyledButton>
        </div>
        {/* Botón para habilitar ítems seleccionados */}
        <div className='col-span-full sm:col-span-3'>
          <StyledButton onClick={handleEnableSelected} height="10" color="green">
            <FaCheckCircle size={20} />
            Habilitar {itemName}
          </StyledButton>
        </div>
        {/* Botón para deshabilitar ítems seleccionados */}
        <div className='col-span-full sm:col-span-3'>
          <StyledButton onClick={handleDisableSelected} height="10" color="red">
            <FaTimesCircle size={20} />
            Deshabilitar {itemName}
          </StyledButton>
        </div>
      </div>
    </div>
  );
};

export default ItemListActions;
