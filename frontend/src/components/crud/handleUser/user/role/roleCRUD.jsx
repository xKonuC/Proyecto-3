import React, { Suspense, useState } from 'react';
import { useNavigate } from "react-router-dom";

// Componentes personalizados
import ModalCRUD from '../../../../modal/modalCRUD';
import HandleAlert from '../../../../alert/handleAlert';

import CreateBatchService from '../../../../../utils/crudHelpers/service/batchService/createBatchService';
import DeleteBatchService from '../../../../../utils/crudHelpers/service/batchService/deleteBatchService';
import ResponseHandler from '../../../../../utils/crudHelpers/responseHandler'
import useModal from '../../../../modal/useModal';
import FormHeaderNotUpdate from '../../../../forms/body/formContainerNotUpdate'
import MultiSelect from '../../../../input/multiSelect';
import StyledButton from '../../../../button/styledButton';

// Utilidades
import { rolesStringToArray } from '../../../../../utils/crudHelpers/utils'

// Constantes
import { MAX_LENGTH_ARRAY_NUMBER, roles } from '../../../../../utils/crudHelpers/constants';

//Estilos
import EditRoleIcon from '../../../../icon/crud/editRoleIcon';

const RoleCRUD = ({ rolesString, rolesIdString, name, urls, userID, handleFetchItems }) => {
  // Estado local del componente
  const navigate = useNavigate();

  const [alertComponent, showAlert] = HandleAlert();

  const [items, setItems] = useState([]);
  const [selectedRoles, setSelectedRoles] = useState([]);
  // -------------------------------Funciones Para CRUD-------------------------------
  // Crea nuevos roles y los asocia al usuario.
  const createRoles = async (newRoles) => {
    const createService = new CreateBatchService(urls[0], name, showAlert, responseHandler);
    await createService.execute({ userID }, newRoles, 'roleIDs', MAX_LENGTH_ARRAY_NUMBER);
  };

  // Elimina roles asociados al usuario.
  const deleteRoles = async (rolesToBeRemoved) => {
    const deleteService = new DeleteBatchService(urls[0], name, showAlert, responseHandler);
    await deleteService.execute({ userID }, rolesToBeRemoved, 'roleIDs', MAX_LENGTH_ARRAY_NUMBER);
  };

  // Maneja el envío del formulario y actualización de roles
  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleRoleChange();
  };

  // Maneja el cambio en la asignación de roles.
  const handleRoleChange = async () => {
    const currentRoles = items.map(option => option.value);
    const newRoles = selectedRoles.map(option => option.value);
    const newRolesAdded = newRoles.filter(role => !currentRoles.includes(role));
    const rolesToBeRemoved = currentRoles.filter(role => !newRoles.includes(role));

    if (newRolesAdded.length === 0 && rolesToBeRemoved.length === 0) {
      showAlert({ type: 'verification', content: 'No se ha realizado ningún cambio' });
    }

    if (newRolesAdded.length > 0) {
      await createRoles(newRolesAdded);
    }

    if (rolesToBeRemoved.length > 0) {
      await deleteRoles(rolesToBeRemoved);
    }
  };

  // Función para manejar la verificación
  const handleVerification = async (message) => {
    showAlert({
      type: 'verification',
      content: message,
    });
    closeModal();
    await handleFetchItems();
  };

  // Función para manejar la renovación
  const handleRenewal = async (message) => {
    showAlert({
      type: 'verification',
      content: message,
    });
    await handleFetchItems();
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

  // -------------------------------Funciones para los Modal-------------------------------
  const onOpen = async () => {
    const rolesArray = rolesStringToArray(rolesString, rolesIdString);
    setItems(rolesArray)
    setSelectedRoles(rolesArray);
  };

  const { modalOpen, openModal, closeModal } = useModal(
    false,
    {
      onOpen,
    });

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}

      {/* Modal para CRUD de Roles */}
      <Suspense>
        <ModalCRUD isOpen={modalOpen}>
          <FormHeaderNotUpdate
            message={'Asignación de Roles'}
            messageButton={'Guardar Cambios'}
            handleSubmit={handleSubmit}
            closeModal={closeModal}
            customPath={<EditRoleIcon />}
          >
            <MultiSelect
              selectId="roles"
              placeholder="Roles Actuales"
              options={roles}
              selectedRoles={selectedRoles}
              setSelectedRoles={setSelectedRoles}
            />
          </FormHeaderNotUpdate>
        </ModalCRUD>
      </Suspense>

      {/* Botón para Editar Roles */}
      <StyledButton onClick={openModal} >
        <EditRoleIcon />
        Editar Roles
      </StyledButton>

    </>
  );
};

export default RoleCRUD;