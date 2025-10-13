import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setInfo, setItems, setItemsCopy } from '../../../../../redux/slice/handleRubric/rubric/rubricSlice';

// Componentes personalizados
import HandleAlert from '../../../../alert/handleAlert';
import RubricManagement from '../../../../navbar/management/rubricManagement';
import { compareRubricWithRubricData, convertToRubricObject } from '../../../../../utils/crudHelpers/handleRubric/utils';
import ResponseHandler from '../../../../../utils/crudHelpers/responseHandler';
import UpdateBatchService from '../../../../../utils/crudHelpers/service/batchService/updateBatchService';
import { MAX_LENGTH_ARRAY_DATA } from '../../../../../utils/crudHelpers/constants';
import FetchService from '../../../../../utils/crudHelpers/service/baseService/fetchService';

const RubricNavbar = ({ urls, showClearButton = true }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Hook de navegación para redirection entre rutas
    const { items, itemsCopy, info } = useSelector((state) => state.handleRubric.rubric);
    const [alertComponent, showAlert] = HandleAlert(); // Estado y función para manejar alertas en la aplicación
    const { rubricID, evaluationTypeID, evaluatorID, userID, categoryEvaluator } = useParams(); // Obtiene el ID de la rúbrica desde la URL

    const handleSaveChanges = async () => {
        const { updatedQuestions } = compareRubricWithRubricData(items, itemsCopy);

        // Actualizar preguntas de una sección ya existente
        await updateModifiedQuestions(updatedQuestions);

        if (updatedQuestions.length > 0) {
            // Actualizar los datos de la rubrica
            await updateRubricData();
        }
    };

    const updateModifiedQuestions = async (questions) => {
        const questionDataToUpdate = questions.map(question => ({
            answerID: question.answerID,
            answer: question.answer || null,
        }));
        const updateService = new UpdateBatchService(urls[3], 'rubric', showAlert, responseHandler);
        await updateService.execute({ evaluationTypeID: parseInt(evaluationTypeID, 10), }, questionDataToUpdate, 'dataArray', 100);
    };

    const updateRubricData = async () => {
        const fetchService = new FetchService(urls[1], 'rubric', showAlert, responseHandlerRubric);
        await fetchService.execute({  rubricID: parseInt(rubricID, 10), evaluationTypeID: parseInt(evaluationTypeID, 10), evaluatorID: parseInt(evaluatorID, 10), studentID: parseInt(userID, 10) });
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
    const responseHandlerRubric = (response) => {
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
        const fetchService = new FetchService(urls[1], 'rubric', showAlert, responseHandlerRubric);
        await fetchService.execute({  rubricID: parseInt(rubricID, 10), evaluationTypeID: parseInt(evaluationTypeID, 10), evaluatorID: parseInt(evaluatorID, 10), studentID: parseInt(userID, 10) });
    };

    const handleData = (data) => {
        const rubric = convertToRubricObject(data.rubric);
        dispatch(setInfo(data.rubricInfo));
        dispatch(setItemsCopy(rubric));
        dispatch(setItems(rubric));
    };

    return (
        <>
            {alertComponent}
            <RubricManagement evaluationTypeID={evaluationTypeID} categoryEvaluator={categoryEvaluator} items={items} info={info} itemsCopy={itemsCopy} setItems={{ setItems }} setItemsCopy={{ setItemsCopy }} handleSaveChanges={handleSaveChanges} showClearButton={showClearButton} />
        </>
    );
};

export default RubricNavbar;
