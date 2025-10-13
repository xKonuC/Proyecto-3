import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import StyledButton from "../button/styledButton";
import DeleteIcon from "../icon/crud/deleteIcon";

import { sortMultipleItems } from '../../utils/crudHelpers/searchFilter';
import { removeSearcher, handleSearchParamsChange, getFilteredOptions } from '../../utils/crudHelpers/searchHelper';
import SearchButtons from '../button/search/searchButtons';

const DynamicSort = ({ defaultSearchParamsList = { searchType: '', searchTerm: 'asc' }, options, items, sliceImport, toggleDrawer }) => {
    const dispatch = useDispatch();
    const [searchParamsList, setSearchParamsList] = useState([
        defaultSearchParamsList,
    ]);

    const handleSearchClick = () => {
        const filteredSearchParamsList = searchParamsList.filter(searchParams => searchParams.searchType && searchParams.searchTerm);
        if (filteredSearchParamsList.length > 0) {
            dispatch(sliceImport.setFilteredItems(sortMultipleItems(items, filteredSearchParamsList)));
            toggleDrawer();
        }
    };

    const toggleSortDirection = (index) => {
        const updatedSearchParamsList = [...searchParamsList];
        const currentSearchTerm = updatedSearchParamsList[index].searchTerm;
        updatedSearchParamsList[index].searchTerm = currentSearchTerm === 'asc' ? 'desc' : 'asc';
        setSearchParamsList(updatedSearchParamsList);
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
                {searchParamsList.map((searchParams, index) => (
                    <div key={index} className="grid grid-cols-6 gap-1 p-4 rounded-lg transition duration-200 hover:bg-gray-700 bg-gray-800">
                        <div className="col-span-4">
                            <select
                                className="w-full h-10 rounded-lg cursor-pointer border-gray-300 text-gray-700 text-xs sm:text-sm text-start"
                                value={searchParams.searchType}
                                onChange={(e) => handleSearchParamsChange(index, 'searchType', e.target.value, searchParamsList, setSearchParamsList)}
                            >
                                <option value="">Seleccionar tipo</option>
                                {getFilteredOptions(index, options, searchParamsList).map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="col-span-1">
                            {/* Botón para cambiar la dirección de ordenamiento */}
                            <StyledButton
                                onClick={() => toggleSortDirection(index)}
                                color={searchParams.searchTerm === 'asc' ? 'green' : 'red'}
                                height='10'
                                paddingX='1'
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className={`w-6 h-6 transition-transform transform ${searchParams.searchTerm !== 'asc' ? "rotate-180" : "rotate-0"
                                        }`}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </StyledButton>
                        </div>

                        <div className="col-span-1">
                            <StyledButton
                                onClick={() => removeSearcher(index, searchParamsList, setSearchParamsList)}
                                color="red"
                                height='10'
                                paddingX='1'
                            >
                                <DeleteIcon />
                            </StyledButton>
                        </div>
                    </div>
                ))}
            </div>
            <SearchButtons handleSearchClick={handleSearchClick} options={options} defaultSearchParamsList={defaultSearchParamsList} searchParamsList={searchParamsList} setSearchParamsList={setSearchParamsList}/>
        </>
    );
};

export default DynamicSort;