import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  setItems,
  setNewItem,
  clearFilteredItems,
  clearNewItem,
} from '../../../../redux/slice/handleTitle/title/titleSlice';

// Componentes personalizados
import HandleAlert from '../../../alert/handleAlert';

import FetchService from '../../../../utils/crudHelpers/service/baseService/fetchService';
import DeleteUtilsService from '../../../../utils/crudHelpers/service/utilsService/deleteUtilsService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../modal/useModal';

import ScreenWrapper from '../../../shared/screenWrapper';
import ItemListHeader from '../../../forms/header/itemListHeader';
import TitleTable from './table/titleTable';
import TitleForm from './form/titleForm';

// Utilidades
import { clearCheckbox } from '../../../../utils/crudHelpers/handleCheckbox';
import { MAX_LENGTH_ARRAY_NUMBER } from '../../../../utils/crudHelpers/constants';
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';

const TitleCRUD = ({ name, urls, title, subtitle }) => {
  // Estado local del componente
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

  const dispatch = useDispatch();
  const [degree, setDegree] = useState([]);
  const [university, setUniversity] = useState([]);

  const [selectedItems, setSelectedItems] = useState([]);

  const [updateId, setUpdateId] = useState(null);
  const [selectAll, setSelectAll] = useState(false);

  // -------------------------------Funciones para los Formularios-------------------------------

  // Función para manejar la edición de un elemento
  const handleEdit = (item) => {
    setUpdateId(item.titleID);
    dispatch(setNewItem({
      name: item.name,
      areaID: item.areaID,
      degreeID: item.degreeID,
      universityID: item.universityID,
      nameUniversity: item.nameUniversity,
    }));
    openModal();
  };

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

  // -------------------------------Funciones Para CRUD-------------------------------

  // Función para obtener datos
  const [fetchHandler] = useState(() => async () => {
    await handleFetch();
  });

  const handleFetch = async () => {
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    const fetchTypeService = new FetchService(urls[1], 'degree', showAlert, responseHandlerType);
    const fetchUniversityService = new FetchService(urls[2], 'university', showAlert, responseHandlerUniversity);

    await fetchService.execute({});
    await fetchUniversityService.execute({});
    await fetchTypeService.execute({});
  }

  // Función para manejar la eliminación de elementos seleccionados
  const handleDeleteSelected = async () => {
    const deleteService = new DeleteUtilsService(urls[0], name, showAlert, responseHandler);
    await deleteService.execute({}, selectedItems, 'titleID', 'titleIDs', MAX_LENGTH_ARRAY_NUMBER);
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

  const responseHandlerUniversity = (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onVerification: handleVerification,
      onRenewal: handleRenewal,
      onData: handleUniversity,
    });
  };

  const responseHandlerType = (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onVerification: handleVerification,
      onRenewal: handleRenewal,
      onData: handleType,
    });
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
    await handleFetch();
    showAlert({
      type: 'verification',
      content: message,
    });
  };

  // Función para manejar los datos obtenidos
  const handleData = (data) => {
    const sortedItems = sortItems(data, 'titleID');
    dispatch(setItems(sortedItems));
    dispatch(clearFilteredItems());
    clearCheckbox(setSelectedItems, setSelectAll);
  };

  const handleUniversity = (data) => {
    const sortedItems = sortItems(data, 'universityID', 'asc');
    const format = sortedItems.map(item => ({
      value: item.universityID,
      label: `${item.name} - ${item.country} - ${item.city}`
    }));
    setUniversity(format);
  };

  const handleType = (data) => {
    const sortedItems = sortItems(data, 'degreeID', 'asc');
    const format = sortedItems.map(item => ({
      value: item.degreeID,
      label: item.name
    }));
    setDegree(format);
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

      {/* Modal para CRUD de Títulos */}
        <TitleForm degree={degree} university={university} updateId={updateId} url={urls[0]} itemName={name} showAlert={showAlert} modalOpen={modalOpen} closeModal={closeModal} responseHandler={responseHandler} />

      {/* Contenedor principal con altura mínima de pantalla */}
      <ScreenWrapper>
        {/* Encabezado de la lista de Títulos */}
        <ItemListHeader title={title} subtitle={subtitle} itemName={name} openModal={openModal} fetchItems={handleFetch} handleDeleteSelected={handleDeleteSelected} />

        {/* Tabla de Títulos */}
        <TitleTable
          urls={urls}
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

export default TitleCRUD;