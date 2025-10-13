import React, { Suspense, useState } from 'react';
import { useNavigate } from "react-router-dom";

// Componentes personalizados
import ModalCRUD from '../../../../modal/modalCRUD';
import HandleAlert from '../../../../alert/handleAlert';

import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';
import ResponseHandler from '../../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../../modal/useModal';

import FormContainerNotUpdate from '../../../../forms/body/formContainerNotUpdate'
import TextInput from '../../../../input/textInput';
import StyledButton from '../../../../button/styledButton';

// Utilidades
import { isPasswordValid } from '../../../../../utils/validationUtils';

//Estilos
import ChangePasswordIcon from '../../../../icon/handle/changePasswordIcon';

const getPasswordRequirementsText = () => {
  return (
    <p>
      La contraseña debe cumplir con las siguientes características:
      <br />
      - No se permite el uso de contraseñas repetidas.
      <br />
      - Debe tener una longitud mínima de 8 caracteres.
      <br />
      - Debe contener al menos una letra mayúscula.
      <br />
      - Debe contener al menos una letra minúscula.
      <br />
      - Debe contener al menos un número.
      <br />- Debe contener al menos un carácter especial.
    </p>
  );
};

const PasswordCRUD = ({ urls, id }) => {
  // Estado local del componente
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

  const [itemName] = useState('Usuario');
  const [newItem, setNewItem] = useState({
    password: '',
  });

  // -------------------------------Funciones Para CRUD-------------------------------

  // Función para manejar el envío de datos (submit)
  const handleUpdate = async (event) => {
    event.preventDefault();
    const validationPassword = isPasswordValid(newItem.password);
    if (validationPassword) {
      showAlert({
        type: 'error',
        content: validationPassword,
      });
      return;
    }
    const updateService = new UpdateService(urls[0], itemName, showAlert, responseHandler);
    await updateService.execute({ userID: id, ...newItem });
  };

  // Función para manejar las respuestas de los servicios
  const responseHandler = (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onVerification: handleVerification,
      onRenewal: handleRenewal,
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
    {}
  );

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}

      {/* Modal para Cambio de Contraseña */}
      <Suspense>
        <ModalCRUD isOpen={modalOpen}>
          <FormContainerNotUpdate
            message={'Cambio de Contraseña'}
            secondaryMessage={''}
            pText={getPasswordRequirementsText()}
            messageButton={'Cambiar Contraseña'}
            handleSubmit={handleUpdate}
            closeModal={closeModal}
            customPath={<ChangePasswordIcon />}
          >
            <TextInput
              inputId='passwordUser'
              value={newItem.password}
              onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
              placeholder={`Ingresar Contraseña`}
            />
          </FormContainerNotUpdate>
        </ModalCRUD>
      </Suspense>

      {/* Botón para Cambio de Contraseña */}
      <StyledButton onClick={openModal} >
        <ChangePasswordIcon />
        Cambiar Contraseña
      </StyledButton>

    </>
  );
};

export default PasswordCRUD;