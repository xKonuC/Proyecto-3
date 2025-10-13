import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setItems, setItemsCopy } from '../../../../../redux/slice/handleRubric/templateOverview/templateOverviewSlice';

// Componentes personalizados
import HandleAlert from '../../../../alert/handleAlert';
import TemplateManagement from '../../../../navbar/management/templateManagement';
import { compareTemplateWithTemplateData } from '../../../../../utils/crudHelpers/handleRubric/templateUtils';
import ResponseHandler from '../../../../../utils/crudHelpers/responseHandler';
import CreateBatchService from '../../../../../utils/crudHelpers/service/batchService/createBatchService';
import UpdateBatchService from '../../../../../utils/crudHelpers/service/batchService/updateBatchService';
import CreateDataReturningBatchService from '../../../../../utils/crudHelpers/service/dataReturningBatchService/createDataReturningBatchService';
import { MAX_LENGTH_ARRAY_DATA, MAX_LENGTH_ARRAY_NUMBER } from '../../../../../utils/crudHelpers/constants';
import { renewSession } from '../../../../../utils/sessionHelpers';
import DeleteBatchService from '../../../../../utils/crudHelpers/service/batchService/deleteBatchService';
import { sortItems } from '../../../../../utils/crudHelpers/searchFilter';
import FetchService from '../../../../../utils/crudHelpers/service/baseService/fetchService';

const TemplateOverviewNavbar = ({ urls }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook de navegación para redirection entre rutas
    const { items, itemsCopy } = useSelector((state) => state.handleRubric.templateOverview);
    const [alertComponent, showAlert] = HandleAlert(); // Estado y función para manejar alertas en la aplicación
    const { templateID } = useParams(); // Obtiene el ID de la rúbrica desde la URL

    const handleSaveChanges = async () => {
        const { newSectionsFiltered, missingTemplateHasSectionIDs, changedSections, questionsWithIDZero, missingTemplateHasQuestionIDs, updatedQuestions } = compareTemplateWithTemplateData(items, itemsCopy);

        // Crear nuevas secciones y preguntas si existen
        if (newSectionsFiltered.length > 0) {
            await createNewSections(newSectionsFiltered);
        }

        // Eliminar secciones faltantes
        await deleteMissingSections(missingTemplateHasSectionIDs);

        // Actualizar secciones modificadas
        await updateChangedSections(changedSections);

        // Crear preguntas con de un sección ya existente
        await createQuestionsWithZeroID(questionsWithIDZero);

        // Eliminar preguntas de una sección ya existente
        await deleteMissingQuestions(missingTemplateHasQuestionIDs);

        // Actualizar preguntas de una sección ya existente
        await updateModifiedQuestions(updatedQuestions);

        // Actualizar los datos de la Plantilla
        await updateTemplateData();
    };

    const createNewSections = async (sections) => {
        try {
            const sectionDataToSend = sections.map(section => ({
                sectionID: section.sectionID,
                positionNumber: section.positionNumber
            }));
            const createService = new CreateDataReturningBatchService(urls[3], 'template', showAlert);
            const templateHasSectionIDsResponse = await createService.execute({ templateID }, sectionDataToSend, 'dataArray', 100);

            const hasExpirationError = templateHasSectionIDsResponse.some(item => item.expirationError);
            if (hasExpirationError) {
                await renewSession();
                return;
            }

            const templateHasSectionIDs = templateHasSectionIDsResponse.filter(item => typeof item === 'number');
            if (templateHasSectionIDs.length > 0) {
                const questionsToSubmit = [];

                sections.forEach((section, index) => {
                    if (index < templateHasSectionIDs.length) {
                        const templateHasSectionID = templateHasSectionIDs[index];
                        section.questions.forEach(question => {
                            questionsToSubmit.push({
                                questionID: question.questionID,
                                templateHasSectionID,
                                positionNumber: question.positionNumber,
                            });
                        });
                    }
                });

                if (questionsToSubmit.length > 0) {
                    const createBatchService = new CreateBatchService(urls[4], 'template', showAlert, responseHandler);
                    await createBatchService.execute({}, questionsToSubmit, 'dataArray', 100);
                }
            } else {
                showAlert({ type: 'error', content: 'Hubo un error al procesar las secciones. Por favor, inténtelo de nuevo.' });
            }
        } catch (error) {
            showAlert({ type: 'error', content: 'Hubo un error al crear nuevas secciones.' });
        }
    };

    const deleteMissingSections = async (missingSectionIDs) => {
        const deleteService = new DeleteBatchService(urls[3], 'template', showAlert, responseHandler);
        await deleteService.execute({ templateID }, missingSectionIDs, 'templateHasSectionIDs', 100);
    };

    const updateChangedSections = async (sections) => {
        const sectionDataToSend = sections.map(section => ({
            templateHasSectionID: section.templateHasSectionID,
            sectionID: section.sectionID,
            positionNumber: section.positionNumber
        }));
        const updateSectionService = new UpdateBatchService(urls[3], 'template', showAlert, responseHandler);
        await updateSectionService.execute({ templateID }, sectionDataToSend, 'templateHasSectionArray', 100);
    };

    const createQuestionsWithZeroID = async (questions) => {
        const questionDataToSend = questions.map(question => ({
            questionID: question.questionID,
            templateHasSectionID: question.templateHasSectionID,
            positionNumber: question.positionNumber,
        }));
        const createBatchService = new CreateBatchService(urls[4], 'template', showAlert, responseHandler);
        await createBatchService.execute({}, questionDataToSend, 'dataArray', 100);
    };

    const deleteMissingQuestions = async (missingQuestionIDs) => {
        const deleteQuestionService = new DeleteBatchService(urls[4], 'template', showAlert, responseHandler);
        await deleteQuestionService.execute({}, missingQuestionIDs, 'templateHasQuestionIDs', 100);
    };

    const updateModifiedQuestions = async (questions) => {
        const questionDataToUpdate = questions.map(question => ({
            templateHasQuestionID: question.templateHasQuestionID,
            questionID: question.questionID,
            templateHasSectionID: question.templateHasSectionID,
            positionNumber: question.positionNumber,
        }));
        const updateService = new UpdateBatchService(urls[4], 'template', showAlert, responseHandler);
        await updateService.execute({}, questionDataToUpdate, 'templateHasQuestionArray', 100);
    };

    const updateTemplateData = async () => {
        const fetchService = new FetchService(urls[0], 'template', showAlert, responseHandlerTemplate);
        await fetchService.execute({ templateID });
    };

    // Función para manejar las respuestas de los servicios
    const responseHandler = (response) => {
        ResponseHandler({
            showAlert,
            response,
            navigate,
        });
    };

    // Función para manejar las respuestas de los servicios para el final del proceso
    const responseHandlerTemplate = (response) => {
        ResponseHandler({
            showAlert,
            response,
            navigate,
            onRenewal: handleRenewal,
            onData: handleData,
        });
    };

    // Función para manejar la renovación
    const handleRenewal = async (message) => {
        showAlert({
            type: 'verification',
            content: message,
        });
        const fetchService = new FetchService(urls[0], 'template', showAlert, responseHandlerTemplate)
        await fetchService.execute({ templateID });
    };

    const handleData = (data) => {
        // Filtra las secciones que tienen valores nulos
        const filteredSections = data[0].sections.filter(section =>
            section.positionNumber !== null || section.questions !== null
        );

        // Ordena las secciones filtradas por positionNumber
        const sortedSections = sortItems(filteredSections, 'positionNumber');

        // Formatea las preguntas de las secciones ordenadas
        const formattedSections = sortedSections.map(section => {
            const sortedQuestions = sortItems(section.questions, 'positionNumber');
            return {
                ...section,
                questions: sortedQuestions
            };
        });

        const sortedData = {
            ...data[0],
            sections: formattedSections
        };
        dispatch(setItemsCopy(sortedData));
        dispatch(setItems(sortedData));
    };

    return (
        <>
            {alertComponent}
            <TemplateManagement urls={urls} name={'Plantilla'} items={items} itemsCopy={itemsCopy} setItems={{ setItems }} setItemsCopy={{ setItemsCopy }} handleSaveChanges={handleSaveChanges} />
        </>
    );
};

export default TemplateOverviewNavbar;
