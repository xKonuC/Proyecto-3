import React from 'react';
import CreateIcon from '../../icon/crud/createIcon';
import { addSearcher } from '../../../utils/crudHelpers/searchHelper';

function SearchButtons({ handleSearchClick, options, defaultSearchParamsList, searchParamsList, setSearchParamsList }) {
    return (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <button type="button" className="group transition duration-200 p-4 rounded-lg cursor-pointer hover:bg-gray-700 bg-gray-800" onClick={() => addSearcher(options, defaultSearchParamsList, searchParamsList, setSearchParamsList)} disabled={options.length === searchParamsList.length}>
                <div className="flex justify-center items-center text-gray-400 group-hover:text-white p-2 mx-auto mb-2 bg-gray-700 group-hover:bg-gray-800 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                    <CreateIcon />
                </div>
                <div className="font-medium text-center text-gray-400 group-hover:text-white">
                    {(options.length !== searchParamsList.length) ? "Agregar Buscador" : "No disponibles"}
                </div>
            </button>
            <button type="button" className="group transition duration-200 p-4 rounded-lg cursor-pointer hover:bg-gray-700 bg-gray-800" onClick={handleSearchClick} disabled={searchParamsList.length === 0}>
                <div className="flex justify-center items-center text-gray-400 group-hover:text-white p-2 mx-auto mb-2 bg-gray-700 group-hover:bg-gray-800 rounded-full w-[48px] h-[48px] max-w-[48px] max-h-[48px]">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5" />
                    </svg>
                </div>
                <div className="font-medium text-center text-gray-400 group-hover:text-white">
                    {searchParamsList.length === 0 ? "No hay criterios de búsqueda" : "Aplicar Filtro"}
                </div>
            </button>
        </div>
    );
}

export default SearchButtons;
