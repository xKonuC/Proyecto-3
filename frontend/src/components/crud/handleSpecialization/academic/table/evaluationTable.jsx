import React, { useState, useMemo, memo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

// Componentes
import PaginationButtons from '../../../../button/table/paginationButtons';
import TabNavigation from '../../../../tab/tabNavigation'
import StyledButton from '../../../../button/styledButton';
import SimpleTable from '../../../../table/simpleTable';
import TbodyContent from '../../../../table/tableComponent/bodyContent';
import { LateIndicator } from '../../../../shared/lateIndicator';
import StyledLinkButton from '../../../../button/variation/StyledLinkButton';
import ReviewCRUD from '../review/reviewCRUD';

// Utilidades
import { getCurrentPageItemsMultiple } from '../../../../../utils/crudHelpers/paginationHelper';
import { ActionsCell, ItemCell } from '../../../../table/tableComponent/tableComponent';

// Constantes
import { ITEMS_PER_PAGE } from '../../../../../utils/crudHelpers/constants';

//Estilos
import { theadContentTr, theadContentDiv, tbodyContentTr, tbodyContentButton, tbodyContentTd } from '../../../../../utils/style/crud/classes';
import EvaluateIcon from '../../../../icon/utils/evaluateIcon'
import { formatDateValue, isArray, verifyTokenAndMatchUserID } from '../../../../../utils/crudHelpers/utils';

const options_evaluationTypeID_1 = [
    { label: `Nombre del Estudiante`, value: 'fullName' },
    { label: `Estado de la Revisión`, value: 'preproject_status' },
    { label: `Fecha de Subida`, value: 'creationDate' },
    { label: `Fecha de Actualización`, value: 'updateDate' },
    { label: `Email del Estudiante`, value: 'email' },
    { label: `Linea de Formación`, value: 'specializationName' },
    { label: `Nombre del Evaluador A`, value: 'academicA_fullName' },
    { label: `Evaluación del Evaluador A`, value: 'academicA_status' },
    { label: `Nombre del Evaluador B`, value: 'academicB_fullName' },
    { label: `Evaluación del Evaluador B`, value: 'academicB_status' },
];

const options_evaluationTypeID_2 = [
    { label: `Nombre del Estudiante`, value: 'fullName' },
    { label: `Estado de la Revisión`, value: 'thesis_status' },
    { label: `Fecha de Subida`, value: 'creationDate' },
    { label: `Fecha de Actualización`, value: 'updateDate' },
    { label: `Email del Estudiante`, value: 'email' },
    { label: `Linea de Formación`, value: 'specializationName' },
    { label: `Nombre del Evaluador A`, value: 'academicA_fullName' },
    { label: `Nota del Evaluador A`, value: 'academicA_grade1' },
    { label: `Nombre del Evaluador B`, value: 'academicB_fullName' },
    { label: `Nota del Evaluador B`, value: 'academicB_grade1' },
    { label: `Nombre del Director de Tesis`, value: 'director_fullName' },
    { label: `Nota del Director de Tesis`, value: 'director_grade1' },
    { label: `Nombre del Co-Director de Tesis`, value: 'codirector_fullName' },
    { label: `Nota del Co-Director de Tesis`, value: 'codirector_grade1' },
    { label: `Nombre del Director de Programa`, value: 'programDirector_fullName' },

];

const EvaluationTable = memo((props) => {
    const {
        url, semester, isLoading, currentPage, currentTab, setCurrentPage, setCurrentTab
    } = props;

    const { items, filteredItems } = useSelector((state) => state.handleSpecialization.administrative.evaluatorAssignment);
    const { evaluationTypeID } = useParams();
    const parsedEvaluationTypeID = parseInt(evaluationTypeID, 10);
    const options = parsedEvaluationTypeID === 1 ? options_evaluationTypeID_1 : options_evaluationTypeID_2;
    const [searchTerm, setSearchTerm2] = useState('');

    const currentItems = useMemo(() => {
        // Usar la función para verificar si filteredItems es un array
        const isFiltered = isArray(filteredItems);
        const searchParamsArray = [{ searchType: 'semesterID', searchTerm: searchTerm }];
        return isFiltered ?
            getCurrentPageItemsMultiple(ITEMS_PER_PAGE, searchParamsArray, currentPage, filteredItems) :
            getCurrentPageItemsMultiple(ITEMS_PER_PAGE, searchParamsArray, currentPage, items);
    }, [filteredItems, searchTerm, currentPage, items]);

    const numberFiltered = useMemo(() => {
        // Usar la función para verificar si filteredItems es un array
        const isFiltered = isArray(filteredItems);
        return isFiltered ? filteredItems.length : items.length;
    }, [filteredItems, items]);

    const theadContent = (
        <>
            <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
                {parsedEvaluationTypeID === 1 ? 'Revisión de Anteproyecto' : 'Revisión de Tesis'}
            </th>
            <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
                {parsedEvaluationTypeID === 1 ? 'Evaluar Anteproyecto' : 'Evaluar Tesis'}
            </th>
            <th className='whitespace-nowrap px-4 py-2 text-center font-medium text-gray-900'>
                Subido dentro del Plazo de Entrega
            </th>
            {options.map((option) => (
                <th key={option.value} className={theadContentTr}>
                    <div className={theadContentDiv}>
                        {option.label}
                    </div>
                </th>
            ))}
        </>
    );

    const tbodyContent = (
        <TbodyContent itemsLength={items.length} isLoading={isLoading} length={options.length}>
            {currentItems.map((item) => item.projectURL && (
                <tr key={item.evaluationID} className={tbodyContentTr}>
                    <ActionsCell>
                        {parsedEvaluationTypeID === 1 ?
                            <>
                                {verifyTokenAndMatchUserID(item.academicA_userID) === true &&
                                    <ReviewCRUD url={url} matchesAcademicA={true} item={item} />
                                }
                                {verifyTokenAndMatchUserID(item.academicB_userID) === true &&
                                    <ReviewCRUD url={url} matchesAcademicA={false} item={item} />
                                }
                            </>
                            :
                            <div className={tbodyContentButton}>
                                <StyledLinkButton url={item.projectURL}>
                                    Ver Tesis
                                </StyledLinkButton>
                            </div>
                        }
                    </ActionsCell>
                    <ActionsCell>
                        {item.rubric_rubricID && <>
                            {verifyTokenAndMatchUserID(item.academicA_userID) === true &&
                                <div className={tbodyContentButton}>
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        to={`/Administrative/Academic/HandleRubric/${parsedEvaluationTypeID}/${item.rubric_rubricID}/${item.userID}/${parsedEvaluationTypeID === 1 ? item.academicA_preprojectEvaluatorID : item.academicA_thesisEvaluatorID}/2`}
                                    >
                                        <StyledButton>
                                            <EvaluateIcon />
                                            Como 1° Evaluador
                                        </StyledButton>
                                    </Link>
                                </div>
                            }
                            {verifyTokenAndMatchUserID(item.academicB_userID) === true &&
                                <div className={tbodyContentButton}>
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        to={`/Administrative/Academic/HandleRubric/${parsedEvaluationTypeID}/${item.rubric_rubricID}/${item.userID}/${parsedEvaluationTypeID === 1 ? item.academicB_preprojectEvaluatorID : item.academicB_thesisEvaluatorID}/3`}
                                    >
                                        <StyledButton>
                                            <EvaluateIcon />
                                            Como 2° Evaluador
                                        </StyledButton>
                                    </Link>
                                </div>
                            }
                            {verifyTokenAndMatchUserID(item.codirector_userID) === true &&
                                <div className={tbodyContentButton}>
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        to={`/Administrative/Academic/HandleRubric/${parsedEvaluationTypeID}/${item.rubric_rubricID}/${item.userID}/${item.codirector_thesisEvaluatorID}/5`}
                                    >
                                        <StyledButton>
                                            <EvaluateIcon />
                                            Como Co-Director
                                        </StyledButton>
                                    </Link>
                                </div>
                            }
                            {verifyTokenAndMatchUserID(item.director_userID) === true &&
                                <div className={tbodyContentButton}>
                                    <Link
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        to={`/Administrative/Academic/HandleRubric/${parsedEvaluationTypeID}/${item.rubric_rubricID}/${item.userID}/${item.director_thesisEvaluatorID}/4`}
                                    >
                                        <StyledButton>
                                            <EvaluateIcon />
                                            Como Director
                                        </StyledButton>
                                    </Link>
                                </div>
                            }
                        </>}
                    </ActionsCell>
                    <ActionsCell>
                        <div className={tbodyContentTd}>
                            <LateIndicator lateMinutes={item.lateMinutes} />
                        </div>
                    </ActionsCell>
                    {options.map((option) => (
                        <ItemCell key={option.value} value={formatDateValue(item[option.value], option.value)} />
                    ))}
                </tr>
            ))}
        </TbodyContent >
    );

    return (
        <>
            <PaginationButtons currentPage={currentPage} setCurrentPage={setCurrentPage} length={items.length} itemsPerPage={ITEMS_PER_PAGE} numberFiltered={numberFiltered} />
            <TabNavigation setSearchTerm={setSearchTerm2} currentTab={currentTab} setCurrentTab={setCurrentTab} items={semester} itemsPerPage={1} />
            <SimpleTable theadContent={theadContent} tbodyContent={tbodyContent} />
        </>
    )
});

export default EvaluationTable;