import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  setItems,
  setNewItem,
  clearNewItem,
  clearFilteredItems,
} from '../../../../../redux/slice/handleSpecialization/administrative/thesisRegistrationSlice';

// Componentes personalizados
import HandleAlert from '../../../../alert/handleAlert';

import FetchService from '../../../../../utils/crudHelpers/service/baseService/fetchService';
import DeleteUtilsService from '../../../../../utils/crudHelpers/service/utilsService/deleteUtilsService';
import ResponseHandler from '../../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../../modal/useModal';

import ScreenWrapper from '../../../../shared/screenWrapper';
import ItemListHeader from '../../../../forms/header/itemListHeader';
import ThesisRegistrationForm from './form/thesisRegistrationForm';
import ThesisRegistrationTable from './table/thesisRegistrationTable';

// Utilidades
import { clearCheckbox } from '../../../../../utils/crudHelpers/handleCheckbox';
import { MAX_LENGTH_ARRAY_NUMBER } from '../../../../../utils/crudHelpers/constants';
import { sortItems } from '../../../../../utils/crudHelpers/searchFilter';

const ThesisRegistrationCRUD = ({ name, urls, title, subtitle }) => {
  // Estado local del componente
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

  const dispatch = useDispatch();
  const [student, setStudent] = useState([]);
  const [administrative, setAdministrative] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  // -------------------------------Funciones Para CRUD-------------------------------
  // Función para obtener datos
  const [fetchHandler] = useState(() => async () => {
    await handleFetch();
  });

  const handleFetch = async () => {
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    await fetchService.execute({});
    if (student.length === 0 && administrative.length === 0) {
      const fetchStudentService = new FetchService(urls[1], 'student', showAlert, responseHandlerEvaluator);
      const fetchAdministrativeService = new FetchService(urls[2], 'administrative', showAlert, responseHandlerAdministrative);
      await fetchStudentService.execute({});
      await fetchAdministrativeService.execute({});
    }
  }

  // Función para manejar la eliminación de elementos seleccionados
  const handleDeleteSelected = async () => {
    const deleteService = new DeleteUtilsService(urls[0], name, showAlert, responseHandler);
    await deleteService.execute({}, selectedItems, 'thesisRegistrationID', 'thesisRegistrationIDs', MAX_LENGTH_ARRAY_NUMBER);
  };

  // Función para manejar la verificación
  const handleVerification = async (message) => {
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    await fetchService.execute({});
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
    const sortedItems = sortItems(data, 'thesisRegistrationID');
    dispatch(setItems(sortedItems));
    dispatch(clearFilteredItems());
    clearCheckbox(setSelectedItems, setSelectAll);
  };

  const handleStudent = (data) => {
    const sortedItems = sortItems(data, 'rut', 'asc');
    const format = sortedItems.map(item => ({
      value: item.userID,
      label: `${item.rut} - ${item.firstName} ${item.secondName} ${item.surname1} ${item.surname2}`,
    }));
    setStudent(format);
  };

  const handleAdministrative = (data) => {
    const sortedItems = sortItems(data, 'rut', 'asc');
    const format = sortedItems.map(item => ({
      value: item.userID,
      label: `${item.rut} - ${item.firstName} ${item.secondName} ${item.surname1} ${item.surname2}`,
    }));
    setAdministrative(format);
  };

  // Función para manejar la edición de un elemento
  const handleEdit = (item) => {
    setUpdateId(item.thesisRegistrationID);
    dispatch(setNewItem({
      title: item.title,
      codirectorID: item.codirectorID,
      directorID: item.directorID,
      studentID: item.studentID,
    }));
    openModal();
  };

  // Función para limpiar el elemento en edición
  const clearItem = () => {
    dispatch(clearNewItem());
    setUpdateId(null);
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
  const responseHandler = createResponseHandler(handleData); // Para datos de las evaluaciones
  const responseHandlerEvaluator = createResponseHandler(handleStudent); // Para datos de los estudiantes
  const responseHandlerAdministrative = createResponseHandler(handleAdministrative); // Para datos de el director, codirector y director de Programa

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
    if (!isMounted.current) {
      isMounted.current = true;
      setIsLoading(true);
      const fetchData = async () => {
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

      {/* Componente para mostrar mensajes de alerta */}
      <ThesisRegistrationForm student={student} administrative={administrative} url={urls[0]} updateId={updateId} itemName={name} showAlert={showAlert} modalOpen={modalOpen} closeModal={closeModal} responseHandler={responseHandler} />

      {/* Contenedor principal con altura mínima de pantalla */}
      <ScreenWrapper>
        {/* Encabezado de la lista de Acciones */}
        <ItemListHeader title={title} subtitle={subtitle} itemName={name} openModal={openModal} fetchItems={handleFetch} handleDeleteSelected={handleDeleteSelected} />

        {/* Tabla de Datos */}
        <ThesisRegistrationTable
          isLoading={isLoading}
          selectedItems={selectedItems}
          selectAll={selectAll}
          setSelectedItems={setSelectedItems}
          setSelectAll={setSelectAll}
          handleEdit={handleEdit}
        />
      </ScreenWrapper>
    </>
  );
};

export default ThesisRegistrationCRUD;