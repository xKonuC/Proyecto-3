import React, { useState, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';

// Componentes
import StyledButton from '../../../../../button/styledButton';
import TimeIndicator from '../../../../../shared/timeIndicator';
import PaginationButtons from '../../../../../button/table/paginationButtons';
import EvaluateSection from '../section/evaluateSection';
import EvaluateForm from '../form/evaluateForm2';

// Utilidades
import { getCurrentPageItemsSorted } from '../../../../../../utils/crudHelpers/helperFilter';

// Estilos
import CreateIcon from '../../../../../icon/crud/createIcon';
import { useParams } from 'react-router-dom';

const EvaluateOverview
    = memo((props) => {
        const { urls, itemName, isLoading, permission, selectedFile, setSelectedFile, showAlert, openModal, handleEdit, responseHandler } = props;
        const { evaluate } = useSelector((state) => state.handleSpecialization.student.evaluate);
        const { evaluationTypeID } = useParams();
        const evaluationTypeIDAsNumber = parseInt(evaluationTypeID, 10);

        const [currentPage, setCurrentPage] = useState(1);
        const currentItems = useMemo(
            () => getCurrentPageItemsSorted(2, currentPage, evaluate, 'evaluationID', 'asc'),
            [currentPage, evaluate]
        );

        return (
            <>
                <div className="mx-auto max-w-5xl">
                    <TimeIndicator permission={permission[0]} />
                    <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={evaluate.length} itemsPerPage={2} numberFiltered={evaluate.length} />
                    {currentItems.length === 0 ?
                        <>
                            {!isLoading && (
                                < EvaluateForm selectedFile={selectedFile} url={urls[0]} itemName={itemName} setSelectedFile={setSelectedFile} showAlert={showAlert} responseHandler={responseHandler} />
                            )}
                        </> : <>
                            <div className="my-2 flex justify-center items-center w-full">
                                <StyledButton
                                    onClick={openModal}
                                >
                                    <CreateIcon />
                                    {evaluationTypeIDAsNumber === 1 ? 'Subir Anteproyecto' : 'Subir Tesis'}
                                </StyledButton>
                            </div>
                            <EvaluateSection urls={urls} items={currentItems} isLoading={isLoading} handleEdit={handleEdit} />
                        </>}
                </div>
            </>
        )
    });

export default EvaluateOverview;
