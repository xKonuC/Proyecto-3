import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {
  setSemester,
  setNewSemester,
  clearNewSemester,
  clearFilteredItems,
} from '../../../redux/slice/semester/semesterSlice';

// Componentes personalizados
import HandleAlert from '../../alert/handleAlert';

import FetchService from '../../../utils/crudHelpers/service/baseService/fetchService';
import DeleteUtilsService from '../../../utils/crudHelpers/service/utilsService/deleteUtilsService';
import ResponseHandler from '../../../utils/crudHelpers/responseHandler';
import useModal from '../../modal/useModal';

import ScreenWrapper from '../../shared/screenWrapper';
import ItemListHeader from '../../forms/header/itemListHeader';
import SemesterTable from './table/semesterTable';
import SemesterForm from './form/semesterForm';

// Utilidades
import { clearCheckbox } from '../../../utils/crudHelpers/handleCheckbox';
import { MAX_LENGTH_ARRAY_NUMBER } from '../../../utils/crudHelpers/constants';
import { sortItems } from '../../../utils/crudHelpers/searchFilter';

const SemesterCRUD = ({ name, urls, title, subtitle }) => {
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
    await deleteService.execute({}, selectedItems, 'semesterID', 'semesterIDs', MAX_LENGTH_ARRAY_NUMBER);
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
    const sortedItems = sortItems(data, 'semesterID');
    dispatch(setSemester(sortedItems));
    dispatch(clearFilteredItems());
    clearCheckbox(setSelectedItems, setSelectAll);
  };

  // Función para manejar la edición de un elemento
  const handleEdit = (item) => {
    const startDate = new Date(item.startDate);
    const finishDate = new Date(item.finishDate);

    // Restar un día a las fechas
    startDate.setDate(startDate.getDate() + 1);
    finishDate.setDate(finishDate.getDate() + 1);

    setUpdateId(item.semesterID);
    dispatch(setNewSemester({
      startDate: startDate.toISOString().split('T')[0], // Formatear a YYYY-MM-DD
      finishDate: finishDate.toISOString().split('T')[0],
      year: item.year,
      semesterNumber: item.semesterNumber,
    }));
    openModal();
  };


  // Función para limpiar el elemento en edición
  const clearItem = () => {
    dispatch(clearNewSemester());
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

      {/* Modal para CRUD de semestres */}
      <SemesterForm updateId={updateId} url={urls[0]} itemName={name} showAlert={showAlert} modalOpen={modalOpen} closeModal={closeModal} responseHandler={responseHandler} />

      {/* Contenedor principal con altura mínima de pantalla */}
      <ScreenWrapper>
        {/* Encabezado de la lista de semestres */}
        <ItemListHeader title={title} subtitle={subtitle} itemName={name} openModal={openModal} fetchItems={handleFetch} handleDeleteSelected={handleDeleteSelected} />

        {/* Tabla de semestres */}
        <SemesterTable
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

export default SemesterCRUD;