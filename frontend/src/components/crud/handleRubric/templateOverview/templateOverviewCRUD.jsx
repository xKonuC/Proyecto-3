// Importaciones de React y herramientas relacionadas
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

// Acciones de Redux para gestionar el estado global de las rúbricas
import {
  setItems,
  setItemsCopy,
} from '../../../../redux/slice/handleRubric/templateOverview/templateOverviewSlice';

// Componentes personalizados
import HandleAlert from '../../../alert/handleAlert';

import FetchService from '../../../../utils/crudHelpers/service/baseService/fetchService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';
import TemplateListHeader from '../../../forms/header/templateListHeader';
import TemplateOverviewTable from './table/templateOverviewTable';

// Utilidades
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';
import ScreenWrapper from '../../../shared/screenWrapper';

const TemplateOverviewCRUD = ({ name, urls }) => {
  const navigate = useNavigate(); // Hook de navegación para redirection entre rutas
  const [alertComponent, showAlert] = HandleAlert(); // Estado y función para manejar alertas en la aplicación
  const { templateID } = useParams(); // Obtiene el ID de la rúbrica desde la URL
  const dispatch = useDispatch(); // Hook de Redux para despachar acciones al store

  // Estados locales para almacenar datos de la rúbrica, secciones, preguntas, etc.
  const [section, setSection] = useState([]);
  const [question, setQuestion] = useState([]);

  // -------------------------------Funciones Para CRUD-------------------------------
  // Función para obtener datos
  const [fetchHandler] = useState(() => async () => {
    await handleFetch();
  });

  const handleFetch = async () => {
    try {
      // Si no hay datos en las cookies, hacer las solicitudes al servidor
      const fetchQuestionService = new FetchService(urls[1], 'question', showAlert, responseHandlerQuestion);
      const fetchSectionService = new FetchService(urls[2], 'section', showAlert, responseHandlerSection);

      // Ejecutar las solicitudes en paralelo
      await Promise.all([
        fetchQuestionService.execute(),
        fetchSectionService.execute(),
      ]);

      // Después de verificar y, si es necesario, hacer las solicitudes de sección y preguntas,
      // realizar la solicitud de datos de rúbrica relacionados
      await fetchTemplateOverviewRelatedData();
    } catch (error) {
      handleFetchError('Error en handleFetch:', error);
    }
  };


  // Función para obtener datos relacionados con la rúbrica
  const fetchTemplateOverviewRelatedData = async () => {
    try {
      const promises = [
        new FetchService(urls[0], name, showAlert, responseHandlerTemplateOverview).execute({ templateID })
      ];
      await Promise.all(promises);
    } catch (error) {
      handleFetchError('Error en fetchTemplateOverviewRelatedData:', error);
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
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandlerTemplateOverview);

    await fetchService.execute({ templateID });
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

  const handleQuestion = (data) => {
    const sortedItems = sortItems(data, 'questionID', 'asc');
    const format = sortedItems.map(item => ({
      value: item.questionID,
      label: item.question,
    }));
    setQuestion(format);
  };

  const handleSection = (data) => {
    const sortedItems = sortItems(data, 'sectionID', 'asc');
    const format = sortedItems.map(item => ({
      value: item.sectionID,
      label: item.name,
    }));
    setSection(format);
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
  const responseHandlerTemplateOverview = createResponseHandler(handleData); // Para datos de rúbrica
  const responseHandlerSection = createResponseHandler(handleSection); // Para datos de sección
  const responseHandlerQuestion = createResponseHandler(handleQuestion); // Para datos de preguntas

  // -------------------------------Funciones de Extra-------------------------------
  // Ref para verificar si el componente está montado
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  // Hook de efecto para manejar la carga inicial de datos
  useEffect(() => {
    // Iniciar carga de datos
    if (templateID) {
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
  }, [fetchHandler, templateID]);

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}

      {/* Modal para CRUD de usuarios */}

      {/* Contenedor principal con altura mínima de pantalla */}
      <ScreenWrapper>
        <TemplateListHeader sectionSelect={section} />
        <TemplateOverviewTable questionSelect={question} />
      </ScreenWrapper>
    </>
  );
};

export default TemplateOverviewCRUD;
