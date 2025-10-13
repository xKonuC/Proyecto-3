import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import HandleAlert from '../../alert/handleAlert';
import Drawer from '../../drawer/drawer';
import DynamicSearch from '../../search/dynamicSearch';
import DynamicSort from '../../sort/dynamicSort';
import DynamicDateRangeSearch from '../../search/dynamicDateRangeSearch';
import ImportCRUD from '../../crud/handleUser/import/ImportCRUD';
import Navbar from '../navbar';
import ImportIcon from '../../icon/handle/importIcon';
import { handleExport } from '../../../utils/crudHelpers/exportHelper';
import { isArray } from '../../../utils/crudHelpers/utils';

const UserManagement = ({ urls, id, options, exportOptions, dateRangeOptions, acceptedFiles, name, label, items, filteredItems, setItems, setFilteredItems, clearFilteredItems }) => {

    const dispatch = useDispatch();
    const [alertComponent, showAlert] = HandleAlert();

    // Estados para controlar la apertura de cada Drawer
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isDateRangeSearchOpen, setIsDateRangeSearchOpen] = useState(false);
    const [isImportOpen, setIsImportOpen] = useState(false);

    // Funciones para controlar la apertura de cada Drawer
    const toggleSortDrawer = () => setIsSortOpen(!isSortOpen);
    const toggleSearchDrawer = () => setIsSearchOpen(!isSearchOpen);
    const toggleDateRangeSearchDrawer = () => setIsDateRangeSearchOpen(!isDateRangeSearchOpen);
    const toggleImportDrawer = () => setIsImportOpen(!isImportOpen);

    const showClearButton = isArray(filteredItems);

    return (
        <>
            {/* Componente para mostrar mensajes de alerta */}
            {alertComponent}

            {/* Drawers */}
            <Drawer message={'Buscar'} isOpen={isSearchOpen} toggleDrawer={toggleSearchDrawer}>
                <DynamicSearch options={options} items={isArray(filteredItems) ? filteredItems : items} sliceImport={setFilteredItems} toggleDrawer={toggleSearchDrawer} />
            </Drawer>
            <Drawer message={'Ordenar'} isOpen={isSortOpen} toggleDrawer={toggleSortDrawer}>
                <DynamicSort options={options} items={isArray(filteredItems) ? filteredItems : items} sliceImport={setFilteredItems} toggleDrawer={toggleSortDrawer} />
            </Drawer>
            <Drawer message={'Buscar por Rango de Fechas'} isOpen={isDateRangeSearchOpen} toggleDrawer={toggleDateRangeSearchDrawer}>
                <DynamicDateRangeSearch options={dateRangeOptions} items={isArray(filteredItems) ? filteredItems : items} sliceImport={setFilteredItems} toggleDrawer={toggleDateRangeSearchDrawer} />
            </Drawer>
            <Drawer message={'Importar'} isOpen={isImportOpen} toggleDrawer={toggleImportDrawer}>
                <ImportCRUD acceptedFiles={acceptedFiles} name={name} setItems={setItems} label={label} urls={urls} toggleDrawer={toggleImportDrawer} showAlert={showAlert} />
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
                        label: "Buscar por Fechas",
                        onClick: toggleDateRangeSearchDrawer,
                        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z" />
                        </svg>
                    },
                    {
                        id: 3,
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
                        id: 4,
                        label: "Limpiar Filtros",
                        onClick: () => dispatch(clearFilteredItems()),
                        svg: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m20.25 7.5-.625 10.632a2.25 2.25 0 0 1-2.247 2.118H6.622a2.25 2.25 0 0 1-2.247-2.118L3.75 7.5m6 4.125 2.25 2.25m0 0 2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125Z" />
                        </svg>
                    },
                ].filter(Boolean)}
                secondaryButtons={[
                    acceptedFiles.length > 0 && {
                        id: 1,
                        label: "Importar",
                        onClick: toggleImportDrawer,
                        svg: <ImportIcon />
                    },
                    exportOptions.length > 0 && {
                        id: 2,
                        label: "Exportar",
                        onClick: () => handleExport(exportOptions, items, filteredItems, name, id),
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
                                d="M3 16.5V18a2.25 2.25 0 002.25 2.25h13.5A2.25 2.25 0 0021 18v-1.5M7.5 12l4.5-4.5m0 0l4.5 4.5M12 7.5V15"
                            />
                        </svg>
                    }
                ].filter(Boolean)}

            />
        </>
    );
};

export default UserManagement;
