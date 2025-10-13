import React, { Suspense, useState } from 'react';
import { useNavigate } from "react-router-dom";

// Componentes personalizados
import ModalCRUD from '../../../../modal/modalCRUD';
import HandleAlert from '../../../../alert/handleAlert';

import ResponseHandler from '../../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../../modal/useModal';

import FetchService from '../../../../../utils/crudHelpers/service/baseService/fetchService';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

import FormContainerNotUpdate from '../../../../forms/body/formContainerNotUpdate'
import StyledButton from '../../../../button/styledButton';

import SearchSelect from '../../../../input/searchSelect';
import TextInput from '../../../../input/textInput';

// Utilidades
//Estilos
import { FaUserShield } from 'react-icons/fa';
import { sortItems } from '../../../../../utils/crudHelpers/searchFilter';

const ThesisRegistrationCRUD = ({ }) => {
  // Estado local del componente
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

  const [itemName] = useState('Ficha de Inscripción');
  const [newItem, setNewItem] = useState({
    thesisRegistrationID: null,
    directorID: null,
    codirectorID: null,
    title: "",
  });
  const [administrative, setAdministrative] = useState([]);

  // -------------------------------Funciones Para CRUD-------------------------------
  // Función para obtener datos
  const onOpen = async () => {
    if (newItem.thesisRegistrationID === null) {
      const fetchService = new FetchService(import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/specialization/thesisRegistration', itemName, showAlert, responseHandler);
      await fetchService.execute({});
    }
    if (administrative.length === 0) {
      const fetchAdministrativeService = new FetchService(import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/specialization/thesisRegistration/administrative', 'administrative', showAlert, responseHandlerAdministrative);
      await fetchAdministrativeService.execute({});
    }
  }

  // Función para manejar el envío de datos (submit)
  const handleUpdate = async (event) => {
    event.preventDefault();
    const url = import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/specialization/thesisRegistration';
    if (newItem.thesisRegistrationID !== null) {
      const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
      await updateService.execute({ ...newItem });
    } else {
      const createService = new CreateService(url, itemName, showAlert, responseHandler);
      await createService.execute(
        { ...newItem }
      );
    }
  };

  // Función para limpiar el elemento en edición
  const onclose = () => {
  };

  // Función para manejar la verificación
  const handleVerification = async (message) => {
    if (newItem.thesisRegistrationID === null) {
      await onOpen();
    }
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
    setNewItem(data === null ? newItem : data);
  };

  const handleAdministrative = (data) => {
    const sortedItems = sortItems(data, 'fullName', 'asc');
    const format = sortedItems.map(item => ({
      value: item.userID,
      label: item.fullName,
    }));
    setAdministrative(format);
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
  const responseHandlerAdministrative = createResponseHandler(handleAdministrative); // Para datos de el director, codirector y director de Programa

  // -------------------------------Funciones para los Modal-------------------------------
  const { modalOpen, openModal, closeModal } = useModal(
    false,
    {
      onOpen,
      onclose
    },
  );

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}

      {/* Modal para Asignación de Permisos */}
      <Suspense>
        <ModalCRUD isOpen={modalOpen}>
          <FormContainerNotUpdate
            message={'Ficha de Inscripción'}
            secondaryMessage={''}
            messageButton={'Guardar Cambios'}
            handleSubmit={handleUpdate}
            closeModal={closeModal}
            customPath={<FaUserShield size={20} />}
            formHeight='h-40'
          >
            <TextInput
              inputId='title'
              label='Titulo'
              value={newItem.title}
              onChange={(e) => setNewItem(prevState => ({
                ...prevState,
                title: e.target.value
              }))}
              placeholder='Ingresar Titulo'
            />
            <SearchSelect
              selectId='directorID'
              placeholder="Seleccionar un Director"
              options={administrative}
              value={newItem.directorID}
              onChange={(selectedOption) => setNewItem(prevState => ({
                ...prevState,
                directorID: selectedOption.value
              }))}
            />
            <SearchSelect
              selectId='codirectorID'
              placeholder="Seleccionar un Co-Director (Opcional)"
              options={administrative}
              value={newItem.codirectorID}
              onChange={(selectedOption) => setNewItem(prevState => ({
                ...prevState,
                codirectorID: selectedOption.value
              }))}
            />
          </FormContainerNotUpdate>
        </ModalCRUD>
      </Suspense>

      {/* Botón para Asignación de Permisos */}
      <StyledButton onClick={openModal} >
        <FaUserShield size={20} />
        Ficha de Inscripción
      </StyledButton>

    </>
  );
};

export default ThesisRegistrationCRUD;