import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  setItems,
  clearFilteredItems,
  setNewItem,
  clearNewItem,
  setSelectedRoles
} from '../../../../redux/slice/handleUser/user/userSlice';

// Bibliotecas externas
import HandleAlert from '../../../alert/handleAlert';

// Componentes personalizados
import FetchService from '../../../../utils/crudHelpers/service/baseService/fetchService';
import DeleteUtilsService from '../../../../utils/crudHelpers/service/utilsService/deleteUtilsService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../modal/useModal';

// Componentes compartidos
import ScreenWrapper from '../../../shared/screenWrapper';
import ItemListHeader from '../../../forms/header/itemListHeader';
import UserForm from './form/userForm';
import UserTable from './table/userTable';

// Constantes y utilidades
import { clearCheckbox } from '../../../../utils/crudHelpers/handleCheckbox';
import { MAX_LENGTH_ARRAY_NUMBER } from '../../../../utils/crudHelpers/constants';
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';

const UserCRUD = ({ name, urls, title, subtitle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [alertComponent, showAlert] = HandleAlert();

  // Estado local del componente
  const [selectedItems, setSelectedItems] = useState([]);
  const [updateId, setUpdateId] = useState(null);
  const [selectAll, setSelectAll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  // -------------------------------Funciones Para CRUD-------------------------------
  const [fetchHandler] = useState(() => async () => {
    await handleFetch();
  });

  // Función para obtener datos
  const handleFetch = async () => {
    const fetchService = new FetchService(urls[1], name, showAlert, responseHandler);
    await fetchService.execute({});
  }

  // Función para manejar la eliminación de elementos seleccionados
  const handleDeleteSelected = async () => {
    const deleteService = new DeleteUtilsService(urls[0], name, showAlert, responseHandler);
    await deleteService.execute({}, selectedItems, 'userID', 'userIDs', MAX_LENGTH_ARRAY_NUMBER);
  };

  // Función para manejar la verificación
  const handleVerification = async (message) => {
    await fetchHandler();
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
    await fetchHandler();
  };

  // Función para manejar los datos obtenidos
  const handleData = (data) => {
    const sortedItems = sortItems(data, 'userID');
    dispatch(setItems(sortedItems));
    dispatch(clearFilteredItems());
    clearCheckbox(setSelectedItems, setSelectAll);
  };

  // Función para manejar las respuestas de los servicios
  const responseHandler = (response) => {
    ResponseHandler({
      showAlert,
      response,
      navigate,
      onVerification: handleVerification,
      onRenewal: handleRenewal,
      onData: handleData,
    });
  };

  // Función para manejar la edición de un elemento
  const handleEdit = (item) => {
    const birthday = new Date(item.birthday);
    birthday.setDate(birthday.getDate() + 1);

    setUpdateId(item.userID);
    dispatch(setNewItem({
      rut: item.rut,
      firstName: item.firstName,
      secondName: item.secondName,
      surname1: item.surname1,
      surname2: item.surname2,
      sex: item.sex,
      civilStatus: item.civilStatus,
      birthday: birthday.toISOString().split('T')[0],
      address: item.address,
      email: item.email,
      personalEmail: item.personalEmail,
      previousEmail: item.email,
      phone: item.phone,
      workPlace: item.workPlace || '',
      phoneWork: item.phoneWork || '',
      job: item.job || '',
      entry: item.entry || null,
      group: item.group || null,
      articulation: item.articulation || null,
    }));
    openModal();
  };

  // Función para limpiar el elemento en edición
  const clearItem = () => {
    dispatch(clearNewItem());
    setUpdateId(null);
    setSelectedRoles([]);
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

      {/* Modal para CRUD de usuarios */}
      <UserForm updateId={updateId} url={urls[0]} itemName={name} showAlert={showAlert} modalOpen={modalOpen} closeModal={closeModal} responseHandler={responseHandler} />

      {/* Contenedor principal con altura mínima de pantalla */}
      <ScreenWrapper>
        {/* Encabezado de la lista de usuarios */}
        <ItemListHeader title={title} subtitle={subtitle} itemName={name} openModal={openModal} fetchItems={fetchHandler} handleDeleteSelected={handleDeleteSelected} />

        {/* Tabla de usuarios */}
        <UserTable
          urls={urls}
          isLoading={isLoading}
          currentPage={currentPage}
          selectedItems={selectedItems}
          selectAll={selectAll}
          setCurrentPage={setCurrentPage}
          setSelectedItems={setSelectedItems}
          setSelectAll={setSelectAll}
          handleFetch={handleFetch}
          handleEdit={handleEdit}
        />
      </ScreenWrapper>
    </>
  );
};

export default UserCRUD;