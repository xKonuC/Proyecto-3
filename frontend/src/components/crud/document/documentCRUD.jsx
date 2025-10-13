import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  setItems,
  setNewItem,
  clearNewItem,
  clearFilteredItems,
} from '../../../redux/slice/document/documentSlice';

// Componentes personalizados
import HandleAlert from '../../alert/handleAlert';

import FetchService from '../../../utils/crudHelpers/service/baseService/fetchService';
import DeleteUtilsService from '../../../utils/crudHelpers/service/utilsService/deleteUtilsService';
import ResponseHandler from '../../../utils/crudHelpers/responseHandler';
import useModal from '../../modal/useModal';

import ScreenWrapper from '../../shared/screenWrapper';
import ItemListHeader from '../../forms/header/itemListHeader';
import DocumentSection from './section/documentSection';
import DocumentForm from './form/documentForm';

// Utilidades
import { clearCheckbox } from '../../../utils/crudHelpers/handleCheckbox';
import { MAX_LENGTH_ARRAY_NUMBER } from '../../../utils/crudHelpers/constants';
import { sortItems } from '../../../utils/crudHelpers/searchFilter';

const DocumentCRUD = ({ name, urls, title, subtitle }) => {
  // Estado local del componente
  const { userID } = useParams();
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

  const dispatch = useDispatch();
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
    await fetchService.execute({ userID });
  }

  // Función para manejar la eliminación de elementos seleccionados
  const handleDeleteSelected = async () => {
    const deleteService = new DeleteUtilsService(urls[0], name, showAlert, responseHandler);
    await deleteService.execute({}, selectedItems, 'documentID', 'documentIDs', MAX_LENGTH_ARRAY_NUMBER);
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
    handleFetch();
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
    handleFetch();
  };

  // Función para manejar los datos obtenidos
  const handleData = (data) => {
    const sortedItems = sortItems(data, 'documentID');
    dispatch(setItems(sortedItems));
    dispatch(clearFilteredItems());
    clearCheckbox(setSelectedItems, setSelectAll);
  };

  // Función para manejar la edición de un elemento
  const handleEdit = (item) => {
    setUpdateId(item.documentID);
    dispatch(setNewItem({
      archiveURL: item.archiveURL,
      category: item.category,
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
      <Suspense>
        <DocumentForm selectedFile={selectedFile} url={urls[0]} updateId={updateId} itemName={name} setSelectedFile={setSelectedFile} showAlert={showAlert} modalOpen={modalOpen} closeModal={closeModal} responseHandler={responseHandler} />
      </Suspense>

      {/* Contenedor principal con altura mínima de pantalla */}
      <ScreenWrapper>
        {/* Encabezado de la lista de Académicos */}
        <ItemListHeader title={title} subtitle={subtitle} itemName={name} openModal={openModal} fetchItems={handleFetch} handleDeleteSelected={handleDeleteSelected} />

        {/* Tabla de usuarios */}
        <DocumentSection
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

export default DocumentCRUD;