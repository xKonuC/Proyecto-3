import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import StyledButton from "../button/styledButton";
import DeleteIcon from "../icon/crud/deleteIcon";

import { filterMultipleItems } from '../../utils/crudHelpers/searchFilter';
import { removeSearcher, handleSearchParamsChange, getFilteredOptions } from '../../utils/crudHelpers/searchHelper';
import SearchButtons from '../button/search/searchButtons';

const DynamicSearch = ({ defaultSearchParamsList = { searchType: '', searchTerm: '' }, options, items, sliceImport, toggleDrawer }) => {
    const dispatch = useDispatch();
    const [searchParamsList, setSearchParamsList] = useState([
        defaultSearchParamsList,
    ]);

    const handleSearchClick = () => {
        const filteredSearchParamsList = searchParamsList.filter(searchParams => searchParams.searchType && searchParams.searchTerm);
        if (filteredSearchParamsList.length > 0) {
            dispatch(sliceImport.setFilteredItems(filterMultipleItems(items, filteredSearchParamsList)));
            toggleDrawer();
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {searchParamsList.map((searchParams, index) => (
                    <div key={index} className="grid grid-cols-12 gap-1 p-4 rounded-lg transition duration-200 hover:bg-gray-700 bg-gray-800">
                        <div className="grid grid-cols-12 col-span-full sm:col-span-11 space-y-1 sm:space-y-0">
                            <select
                                className="col-span-full sm:col-span-4 h-10 rounded-lg sm:rounded-none sm:rounded-s-lg cursor-pointer border-gray-300 text-gray-700 text-xs sm:text-sm text-start"
                                value={searchParams.searchType}
                                onChange={(e) => handleSearchParamsChange(index, 'searchType', e.target.value, searchParamsList, setSearchParamsList)}
                            >
                                <option value="">Seleccionar tipo</option>
                                {getFilteredOptions(index, options, searchParamsList).map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <div className="relative col-span-full sm:col-span-8">
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchParams.searchTerm}
                                    onChange={(e) => handleSearchParamsChange(index, 'searchTerm', e.target.value, searchParamsList, setSearchParamsList)}
                                    className="h-10 w-full rounded-lg sm:rounded-none sm:rounded-e-lg border-gray-200 pr-10 pl-3 text-xs sm:text-sm text-start"
                                    autoComplete="on"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="cursor-text h-4 w-4 absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </div>
                        </div>
                        <div className="col-span-full sm:col-span-1">
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

export default DynamicSearch;