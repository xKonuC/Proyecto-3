import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  setEvaluate, setNewEvaluate, clearNewEvaluate
} from '../../../../../redux/slice/handleSpecialization/student/evaluate/evaluateSlice';

// Componentes personalizados
import HandleAlert from '../../../../alert/handleAlert';

import FetchService from '../../../../../utils/crudHelpers/service/baseService/fetchService';
import ResponseHandler from '../../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../../modal/useModal';

import StudentScreenWrapper from '../../../../shared/studentScreenWrapper';
import PageHeader from '../../../../forms/header/pageHeader';
import EvaluateOverview from './overview/evaluateOverview';
import EvaluateForm from './form/evaluateForm';

// Utilidades
import { filterItems, sortItems } from '../../../../../utils/crudHelpers/searchFilter';
import { getUserHasPermission, setUserHasPermission } from '../../../../../utils/cookieUtils';

const EvaluateCRUD = ({ name, urls, title, subtitle }) => {
  // Estado local del componente
  const { studentHasSemesterID, evaluationTypeID } = useParams();
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

  const dispatch = useDispatch();
  const [selectedFile, setSelectedFile] = useState(null);

  const [updateId, setUpdateId] = useState(null);
  const [permission, setPermission] = useState([]);

  // -------------------------------Funciones Para CRUD-------------------------------
  // Función para obtener datos
  const [fetchHandler] = useState(() => async () => {
    await handleFetch();
  });

  const handleFetch = async () => {
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    await fetchService.execute({
      studentHasSemesterID: parseInt(studentHasSemesterID, 10),
      evaluationTypeID: parseInt(evaluationTypeID, 10),
    });

    // Verificar si hay están los permisos en las cookies
    const permissionData = getUserHasPermission();

    // Si existen están los permisos en las cookies, usar esos datos en lugar de hacer las solicitudes
    if (permissionData) {
      const filteredItems = parseInt(evaluationTypeID, 10) === 1 ? filterItems(permissionData, 4, 'permissionID') : filterItems(permissionData, 5, 'permissionID');
      setPermission([
        {
          dueDate: filteredItems.length > 0 ? filteredItems[0].dueDate : null,
          label: parseInt(evaluationTypeID, 10) === 1 ? 'Fecha Límite para Subir Anteproyecto:' : 'Fecha Límite para Subir Tesis:',
        }
      ]);
      return;
    }
    const fetchSemesterPermission = new FetchService(urls[3], 'permission', showAlert, responseHandlerPermission);
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

  // Función para manejar la verificación
  const handleVerification = async (message) => {
    await handleFetch();
    showAlert({
      type: 'verification',
      content: message,
    });
    closeModal();
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
    const sortedItems = sortItems(data, 'evaluationID');
    dispatch(setEvaluate(sortedItems));
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

  const handlePermission = (data) => {
    setUserHasPermission(data)
    const filteredItems = parseInt(evaluationTypeID, 10) === 1 ? filterItems(data, 4, 'permissionID') : filterItems(data, 5, 'permissionID');
    setPermission([
      {
        dueDate: filteredItems.length > 0 ? filteredItems[0].dueDate : null,
        label: parseInt(evaluationTypeID, 10) === 1 ? 'Fecha Límite para Subir Anteproyecto:' : 'Fecha Límite para Subir Tesis:',
      }
    ]);

  };

  // Función para manejar la edición de un elemento
  const handleEdit = (item) => {
    setUpdateId(item.evaluationID);
    dispatch(setNewEvaluate({
      projectURL: item.projectURL,
    }));
    openModal();
  };

  // Función para limpiar el elemento en edición
  const clearItem = () => {
    setUpdateId(null);
    dispatch(clearNewEvaluate());
    setSelectedFile(null);
  };

  // -------------------------------Funciones de Extra-------------------------------
  // Ref para verificar si el componente está montado
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Iniciar carga de datos
    if (studentHasSemesterID) {
      if (!isMounted.current) {
        setIsLoading(true);
        const fetchData = async () => {
          isMounted.current = true;
          await fetchHandler();
          setIsLoading(false);
        };
        fetchData();
      }
    }
  }, [fetchHandler, studentHasSemesterID]);

  // -------------------------------Funciones para los Modal-------------------------------
  const { modalOpen, openModal, closeModal } = useModal(
    false,
    {
      onClose: clearItem,
    });

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}
      {/* Componente para mostrar mensajes de alerta */}
      <EvaluateForm selectedFile={selectedFile} url={urls[0]} updateId={updateId} itemName={name} setSelectedFile={setSelectedFile} showAlert={showAlert} modalOpen={modalOpen} closeModal={closeModal} responseHandler={responseHandler} />

      {/* Contenedor principal con altura mínima de pantalla */}
      <StudentScreenWrapper>
        {/* Encabezado de la lista de Académicos */}
        <PageHeader title={title} subtitle={subtitle} />

        <EvaluateOverview
          itemName={name}
          permission={permission}
          urls={urls}
          isLoading={isLoading}
          selectedFile={selectedFile}
          setSelectedFile={setSelectedFile}
          showAlert={showAlert}
          responseHandler={responseHandler}
          handleEdit={handleEdit}
          openModal={openModal}
        />
      </StudentScreenWrapper>
    </>
  );
};

export default EvaluateCRUD;