import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import StyledButton from "../button/styledButton";
import DeleteIcon from "../icon/crud/deleteIcon";
import SearchButtons from '../button/search/searchButtons';
import DateInput from '../input/dateInput';

import { filterMultipleItemsByDateRange } from '../../utils/crudHelpers/searchFilter';
import { removeSearcher, handleSearchParamsChange, getFilteredOptions } from '../../utils/crudHelpers/searchHelper';

const filterOptions = [
    { label: 'Rango', value: 'range' },
    { label: 'Mayor e igual que', value: 'greaterThan' },
    { label: 'Menor e igual que', value: 'lessThan' }
];

const DynamicDateRangeSearch = ({ defaultSearchParamsList = { conditionType: '', startDate: null, endDate: null, searchType: '' }, options, items, sliceImport, toggleDrawer }) => {
    const dispatch = useDispatch();
    const [searchParamsList, setSearchParamsList] = useState([
        defaultSearchParamsList,
    ]);

    const handleSearchClick = () => {
        const filteredSearchParamsList = searchParamsList.filter(searchParams => searchParams.searchType && searchParams.conditionType && (searchParams.startDate || searchParams.endDate));
        if (filteredSearchParamsList.length > 0) {
            console.log(filterMultipleItemsByDateRange(items, filteredSearchParamsList))
            dispatch(sliceImport.setFilteredItems(filterMultipleItemsByDateRange(items, filteredSearchParamsList)));
            toggleDrawer();
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 gap-3">
                {searchParamsList.map((searchParams, index) => (
                    <div key={index} className="grid grid-cols-12 gap-1 p-4 rounded-lg transition duration-200 hover:bg-gray-700 bg-gray-800">
                        <div className="grid grid-cols-11 col-span-full sm:col-span-11 space-y-1 sm:space-y-0">
                            <select
                                className="col-span-full sm:col-span-2 h-10 rounded-lg sm:rounded-none sm:rounded-s-lg cursor-pointer border-gray-300 text-gray-700 text-xs sm:text-sm text-start"
                                value={searchParams.searchType}
                                onChange={(e) => handleSearchParamsChange(index, 'searchType', e.target.value, searchParamsList, setSearchParamsList)}
                            >
                                <option value="">Seleccionar tipo</option>
                                {getFilteredOptions(index, options, searchParamsList).map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <select
                                className="col-span-full sm:col-span-2 h-10 rounded-lg sm:rounded-none sm:rounded-e-lg cursor-pointer border-gray-300 text-gray-700 text-xs sm:text-sm text-start"
                                value={searchParams.conditionType}
                                onChange={(e) => handleSearchParamsChange(index, 'conditionType', e.target.value, searchParamsList, setSearchParamsList)}
                            >
                                <option value="">Seleccionar tipo</option>
                                {filterOptions.map(option => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                            <div className="grid grid-cols-2 col-span-full sm:col-span-7 ml-0 sm:ml-1 gap-1">
                                {searchParams.conditionType === 'range' && (
                                    <>
                                        <div className='col-span-full sm:col-span-1'>
                                            <DateInput
                                                selectId="startDate"
                                                placeholderText="Ingresar Fecha de inicio..."
                                                value={searchParams.startDate}
                                                onChange={(date) => handleSearchParamsChange(index, 'startDate', date, searchParamsList, setSearchParamsList)}
                                            />
                                        </div>
                                        <div className='col-span-full sm:col-span-1'>
                                            <DateInput
                                                selectId="endDate"
                                                placeholderText="Ingresar Fecha de Finalización..."
                                                value={searchParams.endDate}
                                                onChange={(date) => handleSearchParamsChange(index, 'endDate', date, searchParamsList, setSearchParamsList)}
                                            />
                                        </div>
                                    </>
                                )}
                                {searchParams.conditionType !== 'range' && (
                                    <div className='col-span-full sm:col-span-2'>
                                        <DateInput
                                            selectId="startDate"
                                            placeholderText="Ingresar Fecha..."
                                            value={searchParams.startDate}
                                            onChange={(date) => handleSearchParamsChange(index, 'startDate', date, searchParamsList, setSearchParamsList)}
                                        />
                                    </div>
                                )}
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
            <SearchButtons handleSearchClick={handleSearchClick} options={options} defaultSearchParamsList={defaultSearchParamsList} searchParamsList={searchParamsList} setSearchParamsList={setSearchParamsList} />
        </>
    );
};

export default DynamicDateRangeSearch;