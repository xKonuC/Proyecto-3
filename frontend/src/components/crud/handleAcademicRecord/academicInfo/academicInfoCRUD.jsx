import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  setNewItem,
  clearNewItem,
} from '../../../../redux/slice/handleAcademicRecord/academicInfo/academicInfoSlice';

// Componentes personalizados
import HandleAlert from '../../../alert/handleAlert';

import FetchService from '../../../../utils/crudHelpers/service/baseService/fetchService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../modal/useModal';

import IconOnlyAlert from '../../../alert/iconOnlyAlert';
import AcademicInfoForm from './form/academicInfoForm';
import AcademicInfoCard from './card/academicInfoCard';

// Utilidades
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';
import { exportToExcel } from '../../../../utils/crudHelpers/handleAcademicRecord/exportToExcel';

const AcademicInfoCRUD = ({ name, urls, title, subtitle }) => {
  // Estado local del componente
  const { userID } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

  const dispatch = useDispatch();

  const [item, setItem] = useState({});
  const [selectAcademicHasTitle, setSelectAcademicHasTitle] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  // -------------------------------Funciones Para CRUD-------------------------------
  // Función para obtener datos
  const [fetchHandler] = useState(() => async () => {
    await handleFetch();
  });

  const handleFetch = async () => {
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    const fetchTitleService = new FetchService(urls[1], name, showAlert, responseHandlerAcademicHasTitle);

    await fetchService.execute({ userID });
    await fetchTitleService.execute({ userID });
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

  const responseHandlerAcademicHasTitle = (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onVerification: handleVerification,
      onData: handleAcademicHasTitle,
    });
  };

  const responseHandlerExport = (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onVerification: handleVerification,
      onData: handleExcel,
    });
  };

  // Función para manejar la verificación
  const handleVerification = async (message) => {
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    await fetchService.execute({ userID });
    showAlert({
      investigationLines: 'verification',
      content: message,
    });
    closeModal();
  };

  // Función para manejar la renovación
  const handleRenewal = async (message) => {
    showAlert({
      investigationLines: 'verification',
      content: message,
    });
    await handleFetch();
  };

  // Función para manejar los datos obtenidos
  const handleData = (data) => {
    setItem(data[0]);
  };

  const handleAcademicHasTitle = (data) => {
    const sortedItems = sortItems(data, 'academicHasTitleID', 'asc');
    const format = sortedItems.map(item => ({
      value: item.academicHasTitleID,
      label: `${item.title.name} - ${item.titleYear}`
    }));
    setSelectAcademicHasTitle(format);
  }

  // Función para manejar la edición de un elemento
  const handleEdit = () => {
    setUpdateId(item.userID);
    dispatch(setNewItem({
      bestDegreeID: item.bestDegreeID,
      bondType: item.bondType,
      workedHours: item.workedHours.toString(),
      investigationLines: item.investigationLines,
      hierarchy: item.hierarchy,
    }));
    openModal();
  };

  const handleExport = async () => {
    let basePath = '/role/base';

    // Comprobando si la URL contiene 'Academic' o 'Administrator'
    if (location.pathname.includes('Administrator')) {
      basePath = basePath.replace('base', 'administrator');
    } else {
      basePath = basePath.replace('base', 'academic');
    }

    const url = `${import.meta.env.VITE_MIDDLEWARE_URL_BASE}${basePath}/handleAcademicRecord/academicRecord`;

    const fetchService = new FetchService(url, 'Ficha Académica', showAlert, responseHandlerExport);
    await fetchService.execute({ userID });
  };

  const handleExcel = (data) => {
    exportToExcel(data);
  }

  // Función para limpiar el elemento en edición
  const clearItem = () => {
    dispatch(clearNewItem());
    setUpdateId(null);
  };

  // -------------------------------Funciones para los Modal-------------------------------
  const { modalOpen, openModal, closeModal } = useModal(
    false,
    {
      onClose: clearItem,
    });

  // -------------------------------Funciones de Extra-------------------------------
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Iniciar carga de datos
    if (userID || location.pathname.includes('/Academic/')) {
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
  }, [fetchHandler, userID]);

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}

      {/* Componente para mostrar mensajes de alerta */}
      <AcademicInfoForm selectAcademicHasTitle={selectAcademicHasTitle} url={urls[0]} updateId={updateId} itemName={name} showAlert={showAlert} modalOpen={modalOpen} closeModal={closeModal} responseHandler={responseHandler} />

      {/* Tabla de Datos */}
      <div className="min-h-screen flex justify-center">
        {(isLoading && item) ? (
          <IconOnlyAlert />
        ) : (
          <AcademicInfoCard item={item} openModal={openModal} handleEdit={handleEdit} handleExport={handleExport} />
        )}
      </div>
    </>
  );
};

export default AcademicInfoCRUD;