import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

// Componentes personalizados
import ModalCRUD from '../../../modal/modalCRUD';
import useModal from '../../../modal/useModal';
import HandleAlert from '../../../alert/handleAlert';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';
import UpdateService from '../../../../utils/crudHelpers/service/baseService/updateService';

import FormHeaderNotUpdate from '../../../forms/body/formContainerNotUpdate'
import TextInput from '../../../input/textInput';
import StyledButton from '../../../button/styledButton';

//Estilos
import ChangePasswordIcon from '../../../icon/handle/changePasswordIcon';

//Utilidades 
import { isPasswordValid } from '../../../../utils/validationUtils';

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

const PasswordCRUD = () => {
  const [itemName] = useState('Usuario');
  // Estado local del componente
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

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
    const url = import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/role/student/user/updatePassword';
    const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
    await updateService.execute({ ...newItem });
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
      {alertComponent}

      <ModalCRUD isOpen={modalOpen}>
        <FormHeaderNotUpdate
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
        </FormHeaderNotUpdate>
      </ModalCRUD>


      <StyledButton onClick={openModal}
      >
        <ChangePasswordIcon />
        Cambiar Contraseña
      </StyledButton>

    </>
  );
};

export default PasswordCRUD;