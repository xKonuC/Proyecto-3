// Importaciones de React y herramientas relacionadas
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
// Acciones de Redux para gestionar el estado global de las rúbricas
import {
  setItems,
  setInfo,
  setItemsCopy,
} from '../../../../redux/slice/handleRubric/rubric/rubricSlice';

// Componentes personalizados
import HandleAlert from '../../../alert/handleAlert';

import FetchService from '../../../../utils/crudHelpers/service/baseService/fetchService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';
import RubricTable from './table/rubricTable';
import RubricListHeader from '../../../forms/header/rubricListHeader';
import ScreenWrapper from '../../../shared/screenWrapper';

// Utilidades
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';
import { getEvaluationStatus, setEvaluationStatusData } from '../../../../utils/cookieUtils';
import { convertToRubricObject } from '../../../../utils/crudHelpers/handleRubric/utils';

const HandleRubricCRUD = ({ name, urls }) => {
  const navigate = useNavigate(); // Hook de navegación para redirection entre rutas
  const [alertComponent, showAlert] = HandleAlert(); // Estado y función para manejar alertas en la aplicación
  const { rubricID, evaluationTypeID, evaluatorID, userID } = useParams(); // Obtiene el ID de la rúbrica desde la URL
  const dispatch = useDispatch(); // Hook de Redux para despachar acciones al store
  const [evaluationStatus, setEvaluationStatus] = useState([]);

  // -------------------------------Funciones Para CRUD-------------------------------
  // Función para obtener datos
  const [fetchHandler] = useState(() => async () => {
    await handleFetch();
  });

  const handleFetch = async () => {
    try {
      // Verificar si hay datos de sección y preguntas en las cookies
      const evaluationStatusData = getEvaluationStatus();

      // Si existen datos de sección y preguntas en las cookies, usar esos datos en lugar de hacer las solicitudes
      if (evaluationStatusData) {
        setEvaluationStatus(evaluationStatusData);
      } else {
        const fetchEvaluationStatusService = new FetchService(urls[4], 'evaluationStatus', showAlert, responseHandlerEvaluationStatus);

        // Ejecutar las solicitudes en paralelo
        await Promise.all([

          fetchEvaluationStatusService.execute(),
        ]);
      }

      // Después de verificar y, si es necesario, hacer las solicitudes de sección y preguntas,
      // realizar la solicitud de datos de rúbrica relacionados
      await fetchRubricRelatedData();
    } catch (error) {
      handleFetchError('Error en handleFetch:', error);
    }
  };


  // Función para obtener datos relacionados con la rúbrica
  const fetchRubricRelatedData = async () => {
    try {
      const promises = [
        new FetchService(urls[1], name, showAlert, responseHandlerRubric).execute({ rubricID: parseInt(rubricID, 10), evaluationTypeID: parseInt(evaluationTypeID, 10), evaluatorID: parseInt(evaluatorID, 10), studentID: parseInt(userID, 10) })
      ];
      await Promise.all(promises);
    } catch (error) {
      handleFetchError('Error en fetchRubricRelatedData:', error);
    }
  };

  // Función para manejar errores durante la obtención de datos
  const handleFetchError = (context, error) => {
    showAlert({
      type: 'error',
      content: `${context} ${error}`,
    });
  };

  // Función para manejar la verificación
  const handleVerification = async (message) => {
    const fetchService = new FetchService(urls[1], name, showAlert, responseHandlerRubric);

    await fetchService.execute({  rubricID: parseInt(rubricID, 10), evaluationTypeID: parseInt(evaluationTypeID, 10), evaluatorID: parseInt(evaluatorID, 10), studentID: parseInt(userID, 10) });
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

  const handleData = (data) => {
    const rubric = convertToRubricObject(data.rubric);
    dispatch(setInfo(data.rubricInfo));
    dispatch(setItemsCopy(rubric));
    dispatch(setItems(rubric));
  };

  const handleEvaluationStatus = (data) => {
    const sortedItems = sortItems(data, 'evaluationStatusID', 'asc');
    const format = sortedItems.map(item => ({
      value: item.evaluationStatusID,
      label: item.name,
    }));
    setEvaluationStatus(format);
    //Guardo las secciones en las cookies, con eso me evito hacer esta búsqueda si existe un valor,
    setEvaluationStatusData(format);
  };

  // Función de fábrica para crear manejados de respuesta específicos para cada tipo de dato
  const createResponseHandler = (onData) => (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onVerification: handleVerification,
      onRenewal: handleRenewal,
      onData,
    });
  };

  // Creación de manejados de respuesta específicos utilizando la función de fábrica
  const responseHandlerRubric = createResponseHandler(handleData); // Para datos de rúbrica
  const responseHandlerEvaluationStatus = createResponseHandler(handleEvaluationStatus); // Para datos de estados de evaluación

  // -------------------------------Funciones de Extra-------------------------------
  // Ref para verificar si el componente está montado
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // Hook de efecto para manejar la carga inicial de datos
  useEffect(() => {
    // Iniciar carga de datos
    if (rubricID) {
      setIsLoading(true);
      if (!isMounted.current) {
        const fetchData = async () => {
          isMounted.current = true;
          await fetchHandler();
          setIsLoading(false);
        };
        fetchData();
      }
    }
  }, [fetchHandler, rubricID]);

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}

      {/* Modal para CRUD de usuarios */}

      {/* Contenedor principal con altura mínima de pantalla */}
      <ScreenWrapper>
        <RubricListHeader title={parseInt(evaluationTypeID, 10) === 1 ? 'Bienvenido a Evaluación de Anteproyecto' : 'Bienvenido a Evaluación de Tesis'} evaluationStatus={evaluationStatus} url={urls[5]} navigate={navigate} />
        <RubricTable />
      </ScreenWrapper>
    </>
  );
};

export default HandleRubricCRUD;
