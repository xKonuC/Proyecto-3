import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
    setItems,
    clearFilteredItems,
  } from '../../../../redux/slice/handleSpecialization/administrative/evaluatorAssignmentSlice';
  
// Componentes personalizados
import HandleAlert from '../../../alert/handleAlert';

import FetchService from '../../../../utils/crudHelpers/service/baseService/fetchService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';

import ScreenWrapper from '../../../shared/screenWrapper';
import PageHeader from '../../../forms/header/pageHeader';
import EvaluationTable from './table/evaluationTable';

// Utilidades
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';

const EvaluationTypeCRUD = ({ name, urls, title, subtitle }) => {
    // Estado local del componente
    const navigate = useNavigate();
    const [alertComponent, showAlert] = HandleAlert();

    const dispatch = useDispatch();
    const { evaluationTypeID } = useParams();
    const parsedEvaluationTypeID = parseInt(evaluationTypeID, 10);
    const [semester, setSemester] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [currentTab, setCurrentTab] = useState(1);

    // -------------------------------Funciones Para CRUD-------------------------------
    // Función para obtener datos
    const [fetchHandler] = useState(() => async () => {
        await handleFetch();
    });

    const handleFetch = async () => {
        const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
        const fetchSemesterService = new FetchService(urls[1], 'semester', showAlert, responseHandlerSemester);
        await fetchService.execute({ evaluationTypeID: parsedEvaluationTypeID });
        await fetchSemesterService.execute({});
    }

    // Función para manejar las respuestas de los servicios
    const responseHandler = (response) => {
        ResponseHandler({
            showAlert,
            navigate,
            response,
            onVerification: handleVerification,
            onRenewal: handleRenewal,
            onData: handleData,
        });
    };

    const responseHandlerSemester = (response) => {
        ResponseHandler({
            showAlert,
            navigate,
            response,
            onRenewal: handleRenewal,
            onData: handleSemester,
        });
    };

    // Función para manejar la verificación
    const handleVerification = async (message) => {
        showAlert({
            type: 'verification',
            content: message,
        });
    };

    // Función para manejar la renovación
    const handleRenewal = async (message) => {
        showAlert({
            type: 'verification',
            content: message,
        });
        await handleFetch();
    };

    // Función para manejar los datos obtenidos
    const handleData = (data) => {
        const sortedItems = sortItems(data, 'evaluationID', 'desc');
        dispatch(setItems(sortedItems));
        dispatch(clearFilteredItems());
    };

    const handleSemester = (data) => {
        const sortedItems = sortItems(data, 'finishDate', 'desc');
        setSemester(sortedItems);
    };

    // -------------------------------Funciones de Extra-------------------------------
    const isMounted = useRef(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Iniciar carga de datos
        setIsLoading(true);
        if (!isMounted.current) {
            const fetchData = async () => {
                isMounted.current = true;
                await fetchHandler();
                setIsLoading(false);
            };
            fetchData();
        }
    }, [fetchHandler]);

    return (
        <>
            {/* Componente para mostrar mensajes de alerta */}
            {alertComponent}

            {/* Contenedor principal con altura mínima de pantalla */}
            <ScreenWrapper>
                {/* Encabezado de la lista */}
                <PageHeader title={title} subtitle={subtitle} />

                {/* Tabla */}
                <EvaluationTable
                    url={urls[2]}
                    semester={semester}
                    urls={urls}
                    currentPage={currentPage}
                    currentTab={currentTab}
                    isLoading={isLoading}
                    setCurrentPage={setCurrentPage}
                    setCurrentTab={setCurrentTab}
                />
            </ScreenWrapper>
        </>
    );
};

export default EvaluationTypeCRUD;
