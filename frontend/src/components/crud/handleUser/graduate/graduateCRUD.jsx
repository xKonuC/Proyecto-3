import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { useDispatch, useSelector } from 'react-redux';
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
import GraduateForm from './form/graduateForm';
import GraduateTable from './table/graduateTable';
// import ChangeRoleModal from './modal/changeRoleModal'; // Reutilizar o crear si es necesario

// Constantes y utilidades
import { clearCheckbox } from '../../../../utils/crudHelpers/handleCheckbox';
import { sortItems } from '../../../../utils/crudHelpers/searchFilter';

const GraduateCRUD = ({ name, urls, title, subtitle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [alertComponent, showAlert] = HandleAlert();

    // Estado local del componente
    const [selectedItems, setSelectedItems] = useState([]);
    const [updateId, setUpdateId] = useState(null);
    const [selectAll, setSelectAll] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    // const [roleChangeModalOpen, setRoleChangeModalOpen] = useState(false);
    // const [selectedStudent, setSelectedStudent] = useState(null);

  // -------------------------------Funciones Para CRUD-------------------------------
  const [fetchHandler] = useState(() => async () => {
    await handleFetch();
  });

  // Función para obtener datos
  const handleFetch = async () => {
    const fetchService = new FetchService(urls[0], name, showAlert, responseHandler);
    await fetchService.execute();
  };

  // Función para manejar las respuestas de los servicios
  const responseHandler = (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onVerification: handleVerification,
      onRenewal: handleRenewal,
      onData: (data) => {
        if (data && data.data) {
          dispatch(setItems(data.data));
        }
      },
      onSuccess: (message) => {
        showAlert({
          type: 'success',
          content: message,
        });
        closeModal();
        handleFetch(); // Recargar la lista
      },
    });
  };

  // Función para manejar la verificación
  const handleVerification = async (message) => {
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
  };

  // -------------------------------Funciones para los Modal-------------------------------
  const { modalOpen, openModal, closeModal } = useModal(
    false,
    {
      onClose: () => {
        dispatch(clearNewItem());
        setUpdateId(null);
        setSelectedRoles([]);
      },
    }
  );

  const { items } = useSelector((state) => state.handleUser.user);

  // -------------------------------Funciones para el CRUD-------------------------------
  const handleCreate = () => {
    dispatch(clearNewItem());
    openModal();
  };

  const handleUpdate = (id) => {
    const studentToEdit = items.find(item => item.userID === id);
    
    if (studentToEdit) {
      // Cargar los datos del estudiante en el formulario
      dispatch(setNewItem({
        email: studentToEdit.email || '',
        personalEmail: studentToEdit.personalEmail || '',
        rut: studentToEdit.rut || '',
        firstName: studentToEdit.firstName || '',
        secondName: studentToEdit.secondName || '',
        surname1: studentToEdit.surname1 || '',
        surname2: studentToEdit.surname2 || '',
        phone: studentToEdit.phone || '',
        entry: studentToEdit.entry || '',
        group: studentToEdit.group || '',
        articulation: studentToEdit.articulation || '',
        sex: studentToEdit.sex || '',
        civilStatus: studentToEdit.civilStatus || '',
        birthday: studentToEdit.birthday || '',
        address: studentToEdit.address || '',
        workPlace: studentToEdit.workPlace || '',
        phoneWork: studentToEdit.phoneWork || '',
        job: studentToEdit.job || ''
      }));
    }
    
    setUpdateId(id);
    openModal();
  };

  const handleDelete = async () => {
    if (selectedItems.length === 0) {
      showAlert({
        type: 'error',
        content: 'Selecciona al menos un elemento para eliminar',
      });
      return;
    }

    const deleteService = new DeleteUtilsService(urls[0], name, showAlert, responseHandler);
    await deleteService.execute(selectedItems);
  };

  const handleRefresh = () => {
    handleFetch();
    clearCheckbox(setSelectedItems, setSelectAll);
  };

  // -------------------------------Efectos-------------------------------
  useEffect(() => {
    handleFetch();
  }, []);

  useEffect(() => {
    if (selectedItems.length === 0) {
      setSelectAll(false);
    }
  }, [selectedItems]);

  return (
    <>
      {alertComponent}

      <ScreenWrapper>
        <ItemListHeader
          title={title}
          subtitle={subtitle}
          itemName={name}
          openModal={handleCreate}
          fetchItems={handleRefresh}
          handleDeleteSelected={handleDelete}
        />

            <GraduateTable
                selectedItems={selectedItems}
                setSelectedItems={setSelectedItems}
                selectAll={selectAll}
                setSelectAll={setSelectAll}
                onUpdate={handleUpdate}
                // onRoleChange={handleRoleChange}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />

        <GraduateForm
          modalOpen={modalOpen}
          closeModal={closeModal}
          updateId={updateId}
          setUpdateId={setUpdateId}
          url={urls[0]}
          itemName={name}
          showAlert={showAlert}
          responseHandler={responseHandler}
        />

        {/* <ChangeRoleModal
          isOpen={roleChangeModalOpen}
          onClose={closeRoleChangeModal}
          student={selectedStudent}
          onRoleChange={handleRoleChangeSuccess}
        /> */}
      </ScreenWrapper>
    </>
  );
};

export default GraduateCRUD;
