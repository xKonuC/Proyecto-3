import React, { Suspense, useState } from 'react';
import { useNavigate } from "react-router-dom";

// Componentes personalizados
import ModalCRUD from '../../../../modal/modalCRUD';
import HandleAlert from '../../../../alert/handleAlert';

import ResponseHandler from '../../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../../modal/useModal';

import FormContainerNotUpdate from '../../../../forms/body/formContainerNotUpdate'
import StyledButton from '../../../../button/styledButton';
import Checkbox from '../../../../input/checkbox';
import DateInput from '../../../../input/dateInput';

// Utilidades
import { MAX_LENGTH_ARRAY_DATA, MAX_LENGTH_ARRAY_NUMBER, userHasPermission } from '../../../../../utils/crudHelpers/constants';

//Estilos
import { FaUserShield } from 'react-icons/fa';
import FetchService from '../../../../../utils/crudHelpers/service/baseService/fetchService';
import CreateBatchService from '../../../../../utils/crudHelpers/service/batchService/createBatchService';
import UpdateBatchService from '../../../../../utils/crudHelpers/service/batchService/updateBatchService';
import DeleteBatchService from '../../../../../utils/crudHelpers/service/batchService/deleteBatchService';

const PermissionCRUD = ({ url, userID }) => {
  // Estado local del componente
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

  const [itemName] = useState('Usuario');
  const [items, setItems] = useState([])
  const [newItem, setNewItem] = useState(userHasPermission);

  // -------------------------------Funciones Para CRUD-------------------------------

  // Función para manejar el envío de datos (submit)
  const handleUpdate = async (event) => {
    event.preventDefault();

    const toCreate = newItem.filter(item => item.value && item.userHasPermissionID === 0);
    const createPayload = toCreate.map(item => ({
      permissionID: item.permissionID,
      dueDate: item.dueDate,
      userHasPermissionID: null
    }));
    const createBatchService = new CreateBatchService(url, itemName, showAlert, responseHandler);
    await createBatchService.execute({ userID }, createPayload, 'dataArray', MAX_LENGTH_ARRAY_DATA);

    const toDelete = items.filter(item => newItem.find(nItem => nItem.permissionID === item.permissionID && !nItem.value && nItem.userHasPermissionID !== 0));
    const deletePayload = toDelete.map(item => item.userHasPermissionID);
    const deleteService = new DeleteBatchService(url, itemName, showAlert, responseHandler);
    await deleteService.execute({ userID }, deletePayload, 'userHasPermissionIDs', MAX_LENGTH_ARRAY_NUMBER);

    const toUpdate = newItem.filter(item => item.value && item.dueDate !== items.find(i => i.permissionID === item.permissionID)?.dueDate && item.userHasPermissionID !== 0);
    const updatePayload = toUpdate.map(item => ({
      dueDate: item.dueDate,
      userHasPermissionID: item.userHasPermissionID,
      permissionID: null
    }));
    const updateService = new UpdateBatchService(url, itemName, showAlert, responseHandler);
    await updateService.execute({ userID }, updatePayload, 'dataArray', MAX_LENGTH_ARRAY_DATA);

    if (toCreate.length > 0 || toUpdate > 0 || toDelete > 0) {
      onOpen();
      showAlert({
        type: 'verification',
        content: 'Los Permisos fueron actualizados exitosamente',
      });
    }
  };


  // Función para manejar las respuestas de los servicios
  const responseHandler = (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onData: handleData,
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
  };

  // Función para manejar la renovación
  const handleRenewal = async (message) => {
    showAlert({
      type: 'verification',
      content: message,
    });
  };

  // Función para manejar los datos obtenidos
  const handleData = (data) => {
    // Crear una copia de newItem para no mutar el estado directamente
    const updatedNewItems = userHasPermission.map(newItemPermission => {
      // Buscar si el permiso existe en items
      const foundItem = data.find(item => item.permissionID === newItemPermission.permissionID);
      if (foundItem) {
        return {
          ...newItemPermission,
          value: true,
          userHasPermissionID: foundItem.userHasPermissionID,
          dueDate: foundItem.dueDate,
        };
      }
      return {
        ...newItemPermission,
        value: false,
        userHasPermissionID: 0,
        dueDate: null,
      };
    });

    // Actualizar el estado de newItem con los permisos actualizados
    setNewItem(updatedNewItems);
    setItems(data);
  };

  const onOpen = async () => {
    const fetchService = new FetchService(url, itemName, showAlert, responseHandler);
    await fetchService.execute({ userID });
  };

  // Función para limpiar el elemento en edición
  const onclose = () => {
    setItems([]);
    setNewItem(userHasPermission);
  };

  // -------------------------------Funciones para los Modal-------------------------------
  const { modalOpen, openModal, closeModal } = useModal(
    false,
    {
      onOpen,
      onclose
    },
  );

  const handleChangePermission = (index) => {
    const updated = [...newItem];
    updated[index].value = !updated[index].value;
    setNewItem(updated);
  };

  const handleChangeDueDate = (date, index) => {
    const updated = [...newItem];
    updated[index].dueDate = date;
    setNewItem(updated);
  };

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}

      {/* Modal para Asignación de Permisos */}
      <Suspense>
        <ModalCRUD isOpen={modalOpen}>
          <FormContainerNotUpdate
            message={'Asignación de Permisos'}
            secondaryMessage={''}
            messageButton={'Guardar Cambios'}
            handleSubmit={handleUpdate}
            closeModal={closeModal}
            customPath={<FaUserShield size={20} />}
            formHeight='h-96'
          >
            {newItem.map((item, index) => (
              <div key={index}>
                <div className="flex items-start gap-4 rounded-lg border border-gray-200 p-3 transition duration-100 hover:bg-gray-100">
                  <div className="flex items-center">
                    <Checkbox
                      id={`permission-${item.permissionID}`}
                      name={`permission-${item.permissionID}`}
                      checked={item.value}
                      onChange={() => handleChangePermission(index)}
                    />
                  </div>
                  <div className="space-y-2 w-full">
                    <strong className="block text-start font-medium text-gray-900">{item.label}</strong>
                    <div className="w-full">
                      <DateInput
                        selectId={`dueDate-${index}`}
                        placeholderText="Seleccione una fecha y hora"
                        dateFormat="dd/MM/yyyy HH:mm"
                        value={item.dueDate}
                        onChange={(date) => handleChangeDueDate(date, index)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </FormContainerNotUpdate>
        </ModalCRUD>
      </Suspense>

      {/* Botón para Asignación de Permisos */}
      <StyledButton onClick={openModal} >
        <FaUserShield size={20} />
        Asignar Permisos
      </StyledButton>

    </>
  );
};

export default PermissionCRUD;