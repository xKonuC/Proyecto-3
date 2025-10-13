import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  setItems,
  setNewItem,
  clearNewItem,
  clearFilteredItems,
} from '../../../../redux/slice/handleTitle/studentHasTitle/studentHasTitleSlice';

// Componentes personalizados
import HandleAlert from '../../../alert/handleAlert';

import FetchService from '../../../../utils/crudHelpers/service/baseService/fetchService';
import DeleteUtilsService from '../../../../utils/crudHelpers/service/utilsService/deleteUtilsService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../modal/useModal';

import ScreenWrapper from '../../../shared/screenWrapper';
import ItemListHeader from '../../../forms/header/itemListHeader';
import StudentHasTitleTable from './table/studentHasTitleTable';
import StudentHasTitleForm from './form/studentHasTitleForm';

// Utilidades
import { clearCheckbox } from '../../../../utils/crudHelpers/handleCheckbox';
import { MAX_LENGTH_ARRAY_NUMBER } from '../../../../utils/crudHelpers/constants';
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';

const StudentHasTitleCRUD = ({ name, urls, title, subtitle }) => {
  // Estado local del componente
  const { userID } = useParams();
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

  const dispatch = useDispatch();
  const [selectTitle, setSelectTitle] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
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
    const fetchTitleService = new FetchService(urls[1], name, showAlert, responseHandlerTitle);

    await fetchService.execute({ userID });
    await fetchTitleService.execute({});
  }

  // Función para manejar la eliminación de elementos seleccionados
  const handleDeleteSelected = async () => {
    const deleteService = new DeleteUtilsService(urls[0], name, showAlert, responseHandler);
    await deleteService.execute({}, selectedItems, 'studentHasTitleID', 'studentHasTitleIDs', MAX_LENGTH_ARRAY_NUMBER);
  };

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

  const responseHandlerTitle = (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onVerification: handleVerification,
      onRenewal: handleRenewal,
      onData: handleTitle,
    });
  };

  // Función para manejar la verificación
  const handleVerification = async (message) => {
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    await fetchService.execute({ userID });
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
    const sortedItems = sortItems(data, 'studentHasTitleID');
    dispatch(setItems(sortedItems));
    dispatch(clearFilteredItems());
    clearCheckbox(setSelectedItems, setSelectAll);
  };

  const handleTitle = (data) => {
    const sortedItems = sortItems(data, 'titleID', 'asc');
    const format = sortedItems.map(item => ({
      value: item.titleID,
      label: `${item.name} - ${item.universityName}`
    }));
    setSelectTitle(format);
  }

  // Función para manejar la edición de un elemento
  const handleEdit = (item) => {
    setUpdateId(item.studentHasTitleID);
    dispatch(setNewItem({
      titleID: item.title.titleID,
      titleYear: item.titleYear,
    }));
    openModal();
  };

  // Función para limpiar el elemento en edición
  const clearItem = () => {
    dispatch(clearNewItem());
    setSelectedFile(null);
    setUpdateId(null);
  };

  // -------------------------------Funciones para los Modal-------------------------------
  const { modalOpen, openModal, closeModal } = useModal(
    false,
    {
      onClose: clearItem,
    });

  // -------------------------------Funciones de Extra-------------------------------
  // Ref para verificar si el componente está montado
  const isMounted = useRef(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Iniciar carga de datos
    if (userID) {
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
      <StudentHasTitleForm selectedFile={selectedFile} selectTitle={selectTitle} url={urls[0]} updateId={updateId} itemName={name} setSelectedFile={setSelectedFile} showAlert={showAlert} modalOpen={modalOpen} closeModal={closeModal} responseHandler={responseHandler} />

      {/* Contenedor principal con altura mínima de pantalla */}
      <ScreenWrapper>
        {/* Encabezado de la lista de Académicos */}
        <ItemListHeader title={title} subtitle={subtitle} itemName={name} openModal={openModal} fetchItems={handleFetch} handleDeleteSelected={handleDeleteSelected} />

        {/* Tabla de Títulos de Estudiante */}
        <StudentHasTitleTable
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

export default StudentHasTitleCRUD;