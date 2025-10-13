import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  setStudentHasSpecialization,
} from '../../../../../redux/slice/handleSpecialization/student/studentHasSpecialization/studentHasSpecializationSlice';
import {
  setSemester,
} from '../../../../../redux/slice/semester/semesterSlice';

// Componentes personalizados
import HandleAlert from '../../../../alert/handleAlert';

import FetchService from '../../../../../utils/crudHelpers/service/baseService/fetchService';
import ResponseHandler from '../../../../../utils/crudHelpers/responseHandler';

import StudentScreenWrapper from '../../../../shared/studentScreenWrapper';
import StudentHasSpecializationOverview from './overview/studentHasSpecializationOverview';
import PageHeader from '../../../../forms/header/pageHeader';

// Utilidades
import { sortItems, filterItems } from '../../../../../utils/crudHelpers/searchFilter';
import { getUserHasPermission, setUserHasPermission } from '../../../../../utils/cookieUtils';

const StudentHasSemesterCRUD = ({ name, urls, title, subtitle }) => {
  // Estado local del componente
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [permission, setPermission] = useState([]);
  const [alertComponent, showAlert] = HandleAlert();

  // -------------------------------Funciones Para CRUD-------------------------------
  // Función para obtener datos
  const [fetchHandler] = useState(() => async () => {
    await handleFetch();
  });

  const handleFetch = async () => {
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    const fetchSemesterService = new FetchService(urls[1], 'semester', showAlert, responseHandlerSemester);
    await fetchService.execute();
    await fetchSemesterService.execute();

    // Verificar si hay están los permisos en las cookies
    const permissionData = getUserHasPermission();

    // Si existen están los permisos en las cookies, usar esos datos en lugar de hacer las solicitudes
    if (permissionData) {
      const filteredItems = filterItems(permissionData, 1, 'permissionID');
      setPermission([
        { 
          dueDate: filteredItems.length > 0 ? filteredItems[0].dueDate : null, 
          label: 'Fecha Limite para Escoger Linea de Formación:',
        },
      ]);
      return;
    }
    const fetchSemesterPermission = new FetchService(urls[2], 'permission', showAlert, responseHandlerPermission);
    await fetchSemesterPermission.execute();
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
      onVerification: handleVerification,
      onRenewal: handleRenewal,
      onData: handleSemester,
    });
  };

  const responseHandlerPermission = (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onVerification: handleVerification,
      onRenewal: handleRenewal,
      onData: handlePermission,
    });
  };

  // Función para manejar la verificación
  const handleVerification = async (message) => {
    showAlert({
      type: 'verification',
      content: message,
    });
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    await fetchService.execute();
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
    dispatch(setStudentHasSpecialization(data));
  };

  const handlePermission = (data) => {
    const filteredItems = filterItems(data, 1, 'permissionID');
    setUserHasPermission(data)
    setPermission([
      { 
        dueDate: filteredItems.length > 0 ? filteredItems[0].dueDate : null, 
        label: 'Fecha Limite para Escoger Linea de Formación:',
      },
    ]);
  };

  const handleSemester = (data) => {
    const sortedItems = sortItems(data, 'startDate', 'desc');
    const format = sortedItems.map(item => ({
      value: item.semesterID,
      label: `${item.year} - ${item.semesterNumber === 1 ? 'Primer' : 'Segundo'} Semestre`
    }));
    dispatch(setSemester(format));
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
      <StudentScreenWrapper>
        {/* Encabezado de la lista de usuarios */}
        <PageHeader title={title} subtitle={subtitle} />

        {/* Tabla de usuarios */}
        <StudentHasSpecializationOverview
          url={urls[0]}
          permission={permission}
          itemName={name}
          isLoading={isLoading}
          showAlert={showAlert}
          responseHandler={responseHandler}
        />
      </StudentScreenWrapper>
    </>
  );
};

export default StudentHasSemesterCRUD;