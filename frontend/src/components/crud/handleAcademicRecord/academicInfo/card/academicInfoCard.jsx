import React from 'react';
import '../../../../../style/rainbow.css';
import { academicInfoOptions as options } from '../../../../../utils/crudHelpers/options';
import StyledButton from '../../../../button/styledButton';
import CreateIcon from '../../../../icon/crud/createIcon';
import EditIcon from '../../../../icon/crud/editIcon';

const AcademicInfoCard = ({ item, openModal, handleEdit, handleExport }) => {
  return (
    <div className="w-5/6 md:w-4/6 relative h-full overflow-hidden rounded-xl border bg-white shadow border-gray-100 p-4 sm:p-6 lg:p-8" >
      <span className="absolute inset-x-0 bottom-0 h-3">
        <div className="h-full w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-300 animate-rainbow"></div>
      </span>

      <div className="flex items-center justify-center">
        <div className="items-center justify-center space-y-4 sm:space-y-0">
          <div className="text-center">
            <h3 className="text-lg font-bold text-gray-900 sm:text-2xl">
              Grado Académico Máximo: {item?.bestDegreeTitle?.name || 'Título aún no asignado'}
            </h3>

            <p className="text-xs font-medium text-gray-600">
              Año de Obtención del Título: {item?.bestDegreeTitleYear || 'Año no disponible'}
            </p>

          </div>
        </div>
      </div>

      <div className="mt-0 flex justify-center">
        <p className="max-w-[40ch] text-sm text-gray-500">
        </p>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {options.map((option, index) => (
          <div key={index} className="flex flex-col">
            <dt className="text-sm font-medium text-gray-600">{option.label}</dt>
            <dd className="text-xs mt-0.5 text-gray-500">
              {option.value.split('.').reduce((o, i) => o?.[i], item)}
            </dd>
          </div>
        ))}
      </dl>
      <div className='mt-6 w-full'>
        {item === undefined ? <StyledButton
          onClick={openModal}
          height="10"
        >
          <CreateIcon />
          Crear Información Académica
        </StyledButton> : <StyledButton
          onClick={handleEdit}
          height="10"
        >
          <EditIcon />
          Actualizar Información
        </StyledButton>}
      </div>
      <div className="mt-1 w-full">
        <StyledButton
          onClick={handleExport}
          height="10"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
          </svg>
          Exportar Ficha Académica
        </StyledButton>
      </div>
    </div >
  );
};

export default AcademicInfoCard;
