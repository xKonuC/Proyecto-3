import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  setItems,
  setNewItem,
  clearNewItem,
  clearFilteredItems,
} from '../../../../redux/slice/handleRubric/template/templateSlice';

// Componentes personalizados
import HandleAlert from '../../../alert/handleAlert';

import FetchService from '../../../../utils/crudHelpers/service/baseService/fetchService';
import UpdateUtilsService from '../../../../utils/crudHelpers/service/utilsService/updateUtilsService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../modal/useModal';

import ScreenWrapper from '../../../shared/screenWrapper';
import ItemListActions from '../../../forms/header/itemListActions';
import TemplateForm from './form/templateForm';
import TemplateTable from './table/templateTable';

// Utilidades
import { clearCheckbox } from '../../../../utils/crudHelpers/handleCheckbox';
import { MAX_LENGTH_ARRAY_NUMBER } from '../../../../utils/crudHelpers/constants';
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';

const TemplateCRUD = ({ name, urls, title, subtitle }) => {
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
  const handleEnableSelected = async () => {
    const updateService = new UpdateUtilsService(urls[1], name, showAlert, responseHandler);
    await updateService.execute({}, selectedItems, 'templateID', 'templateIDs', MAX_LENGTH_ARRAY_NUMBER);
  };

  const handleDisableSelected = async () => {
    const updateService = new UpdateUtilsService(urls[2], name, showAlert, responseHandler);
    await updateService.execute({}, selectedItems, 'templateID', 'templateIDs', MAX_LENGTH_ARRAY_NUMBER);
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
    const sortedItems = sortItems(data, 'templateID');
    dispatch(setItems(sortedItems));
    dispatch(clearFilteredItems());
    clearCheckbox(setSelectedItems, setSelectAll);
  };

  // Función para manejar la edición de un elemento
  const handleEdit = (item) => {
    setUpdateId(item.templateID);
    dispatch(setNewItem({
      name: item.name,
      description: item.description
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

      {/* Modal para CRUD de secciones */}
      <Suspense>
        <TemplateForm updateId={updateId} url={urls[0]} itemName={name} showAlert={showAlert} modalOpen={modalOpen} closeModal={closeModal} responseHandler={responseHandler} />
      </Suspense>

      {/* Contenedor principal con altura mínima de pantalla */}
      <ScreenWrapper>
        {/* Encabezado de la lista de secciones */}
        <ItemListActions title={title} subtitle={subtitle} itemName={name} openModal={openModal} fetchItems={handleFetch} handleEnableSelected={handleEnableSelected} handleDisableSelected={handleDisableSelected} />

        {/* Tabla de secciones */}
        <TemplateTable
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

export default TemplateCRUD;