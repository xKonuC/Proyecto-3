import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Drawer from '../../drawer/drawer';
import DynamicSearch from '../../search/dynamicSearch';
import DynamicSort from '../../sort/dynamicSort';
import Navbar from '../navbar';
import { isArray } from '../../../utils/crudHelpers/utils';

const SearchAndSort = ({ options, items, filteredItems, setFilteredItems, clearFilteredItems }) => {

    const dispatch = useDispatch();

    // Estados para controlar la apertura de cada Drawer
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    // Funciones para controlar la apertura de cada Drawer
    const toggleSortDrawer = () => setIsSortOpen(!isSortOpen);
    const toggleSearchDrawer = () => setIsSearchOpen(!isSearchOpen);

    const showClearButton = isArray(filteredItems);

    return (
        <>
            {/* Drawers */}
            <Drawer message={'Buscar'} isOpen={isSearchOpen} toggleDrawer={toggleSearchDrawer}>
                <DynamicSearch options={options} items={isArray(filteredItems) ? filteredItems : items} sliceImport={setFilteredItems} toggleDrawer={toggleSearchDrawer} />
            </Drawer>
            <Drawer message={'Ordenar'} isOpen={isSortOpen} toggleDrawer={toggleSortDrawer}>
                <DynamicSort options={options} items={isArray(filteredItems) ? filteredItems : items} sliceImport={setFilteredItems} toggleDrawer={toggleSortDrawer} />
            </Drawer>

            {/* Navbar con botones */}
            <Navbar
                primaryButtons={[
                    {
                        id: 1,
                        label: "Buscar",
                        onClick: toggleSearchDrawer,
                        svg: <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                            />
                        </svg>
                    },
                    {
                        id: 2,
                        label: "Ordenar",
                        onClick: toggleSortDrawer,
                        svg: <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15 11.25l-3-3m0 0l-3 3m3-3v7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    },
                    showClearButton && {
                        id: 3,
                        label: "Limpiar Filtros",
                        onClick: () => dispatch(clearFilteredItems()),
                        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                    },
                ].filter(Boolean)}
            />
        </>
    );
};

export default SearchAndSort;
