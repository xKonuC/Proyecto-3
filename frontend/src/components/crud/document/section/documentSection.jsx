import React, { useState, useMemo, memo } from 'react';
import { useSelector } from 'react-redux';

// Componentes
import PaginationButtons from '../../../button/table/paginationButtons';
import StyledButton from '../../../button/styledButton';
import ItemsList from '../../../sections/list/itemsList';
import BodyContent from '../../../sections/sectionComponent/bodyContent';
import StyledLinkButton from '../../../button/variation/StyledLinkButton';

// Utilidades
import { getCurrentPageItems } from '../../../../utils/crudHelpers/paginationHelper';
import { handleCheckboxChange, handleSelectAllChange } from '../../../../utils/crudHelpers/handleCheckbox';
import { isArray } from '../../../../utils/crudHelpers/utils';
import { CheckboxCell } from '../../../sections/sectionComponent/sectionsComponent';

// Constantes
import { ITEMS_PER_PAGE } from '../../../../utils/crudHelpers/constants';

//Estilos
import EditIcon from '../../../icon/crud/editIcon';
import FileIcon from '../../../image/fileIcon';

const DocumentSection
    = memo((props) => {
        const { isLoading, selectedItems, selectAll, setSelectedItems, setSelectAll, handleEdit } = props;
        const { items, filteredItems } = useSelector((state) => state.document);
        const [currentPage, setCurrentPage] = useState(1);

        const currentItems = useMemo(() => {
            // Usar la función para verificar si filteredItems es un array
            const isFiltered = isArray(filteredItems);
            return isFiltered ?
                getCurrentPageItems(ITEMS_PER_PAGE, currentPage, filteredItems) :
                getCurrentPageItems(ITEMS_PER_PAGE, currentPage, items);
        }, [filteredItems, currentPage, items]);

        const numberFiltered = useMemo(() => {
            // Usar la función para verificar si filteredItems es un array
            const isFiltered = isArray(filteredItems);
            return isFiltered ? filteredItems.length : items.length;
        }, [filteredItems, items]);

        return (
            <>
                <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={numberFiltered} />
                <ItemsList message={'Seleccionar Todos los Documentos del Estudiante'} selectAll={selectAll} handleSelectAllChange={(event) => handleSelectAllChange(event, setSelectAll, setSelectedItems, items)}>
                    <BodyContent itemsLength={items.length} isLoading={isLoading} >
                        {currentItems.map((item) => (
                            <div key={item.documentID} className="flex flex-col justify-center text-center relative">
                                <CheckboxCell id={`deleteInput-${item.documentID}`} checked={selectedItems.some((selectedItem) => selectedItem.documentID === item.documentID)} onChange={(e) => handleCheckboxChange(e, setSelectedItems, 'documentID', item)} />

                                <div className="flex-1 my-2 inline-flex justify-center items-center md:my-2 gap-2">
                                    <FileIcon format={item.format.name} />
                                </div>
                                <p className="text-base text-gray-800 mb-2">{item.category}</p>

                                <div className="flex flex-col items-center justify-center gap-2">
                                    <div className="w-full flex-1 sm:w-52">
                                        <StyledLinkButton url={item.archiveURL}>
                                            Ver Documento
                                        </StyledLinkButton>
                                    </div>
                                    <div className="w-full flex-1 sm:w-52">
                                        <StyledButton onClick={() => handleEdit(item)} >
                                            <EditIcon />
                                            Actualizar Información
                                        </StyledButton>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </BodyContent>
                </ItemsList>
            </>
        )
    });

export default DocumentSection;
