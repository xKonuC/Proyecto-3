import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  setItems,
  setNewItem,
  clearNewItem,
  clearFilteredItems,
} from '../../../../redux/slice/handleTitle/university/universitySlice';

// Componentes personalizados
import HandleAlert from '../../../alert/handleAlert';

import FetchService from '../../../../utils/crudHelpers/service/baseService/fetchService';
import DeleteUtilsService from '../../../../utils/crudHelpers/service/utilsService/deleteUtilsService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../modal/useModal';

import ScreenWrapper from '../../../shared/screenWrapper';
import ItemListHeader from '../../../forms/header/itemListHeader';
import UniversityTable from './table/universityTable';
import UniversityForm from './form/universityForm';

// Utilidades
import { clearCheckbox } from '../../../../utils/crudHelpers/handleCheckbox';
import { MAX_LENGTH_ARRAY_NUMBER } from '../../../../utils/crudHelpers/constants';
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';

const UniversityCRUD = ({ name, urls, title, subtitle }) => {
  // Estado local del componente
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

  const dispatch = useDispatch();
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
  }

  // Función para manejar la eliminación de elementos seleccionados
  const handleDeleteSelected = async () => {
    const deleteService = new DeleteUtilsService(urls[0], name, showAlert, responseHandler);
    await deleteService.execute({}, selectedItems, 'universityID', 'universityIDs', MAX_LENGTH_ARRAY_NUMBER);
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
    const sortedItems = sortItems(data, 'universityID');
    dispatch(setItems(sortedItems));
    dispatch(clearFilteredItems());
    clearCheckbox(setSelectedItems, setSelectAll);
  };

  // Función para manejar la edición de un elemento
  const handleEdit = (item) => {
    setUpdateId(item.universityID);
    dispatch(setNewItem({
      name: item.name,
      city: item.city,
      country: item.country,
    }));
    openModal();
  };

  // Función para limpiar el elemento en edición
  const clearItem = () => {
    dispatch(clearNewItem());
    setUpdateId(null);
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

      {/* Modal para CRUD de usuarios */}
      <UniversityForm updateId={updateId} url={urls[0]} itemName={name} showAlert={showAlert} modalOpen={modalOpen} closeModal={closeModal} responseHandler={responseHandler} />

      {/* Contenedor principal con altura mínima de pantalla */}
      <ScreenWrapper>
        {/* Encabezado de la lista de usuarios */}
        <ItemListHeader title={title} subtitle={subtitle} itemName={name} openModal={openModal} fetchItems={handleFetch} handleDeleteSelected={handleDeleteSelected} />

        {/* Tabla de usuarios */}
        <UniversityTable
          urls={urls}
          isLoading={isLoading}
          selectedItems={selectedItems}
          selectAll={selectAll}
          setSelectedItems={setSelectedItems}
          setSelectAll={setSelectAll}
          handleFetch={handleFetch}
          handleEdit={handleEdit}
        />
      </ScreenWrapper>
    </>
  );
};

export default UniversityCRUD;