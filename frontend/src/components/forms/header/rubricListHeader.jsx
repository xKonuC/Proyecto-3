import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
// Acciones de Redux para gestionar el estado global de las rúbricas
import {
  setItems, setNewItem
} from '../../../redux/slice/handleRubric/rubric/rubricSlice';

import HandleAlert from '../../alert/handleAlert';
import StyledButton from '../../button/styledButton';
import CreateIcon from '../../icon/crud/createIcon';
import EditIcon from '../../icon/crud/editIcon';
import useModal from '../../modal/useModal';
import ModalCRUD from '../../modal/modalCRUD';
import FormContainerNotUpdate from '../body/formContainerNotUpdate';
import SearchSelect from '../../input/searchSelect';
import UpdateService from '../../../utils/crudHelpers/service/baseService/updateService';
import TextInput from '../../input/textInput';
import TextArea from '../../input/textArea';
import ResponseHandler from '../../../utils/crudHelpers/responseHandler';

const RubricListHeader = ({ evaluationStatus, title = 'Bienvenido a Administración de Rubricas', url, navigate }) => {
  const dispatch = useDispatch(); // Hook de Redux para despachar acciones al store
  const { items: rubric, newItem } = useSelector((state) => state.handleRubric.rubric);
  const [alertComponent, showAlert] = HandleAlert(); // Estado y función para manejar alertas en la aplicación
  const { rubricID, evaluationTypeID } = useParams(); // Obtiene el ID de la rúbrica desde la URL

  // Estados locales para almacenar datos de nuevas secciones y preguntas
  const [eventType, setEventType] = useState(0);

  const handleSuccess = async (event) => {
    event.preventDefault();
    if (eventType === 1) {
      const updateService = new UpdateService(url, 'rubric', showAlert, responseHandler);
      await updateService.execute({ ...newItem, grade1: parseFloat(newItem.grade1 || 1.0).toFixed(1) });
    }
  };

  const openModalEvent = (eventType) => {
    setEventType(eventType);
    // Configurar el objeto newItem
    const newItemData = {
      rubricID: parseInt(rubricID, 10),
      evaluationTypeID: parseInt(evaluationTypeID, 10),
      evaluator1ID: rubric.evaluatorID,
      grade1: parseFloat(rubric.grade1 || 1.0), // Usar 1.0 si grade1 es undefined o null
      comment: rubric.comment || '', // Usar cadena vacía si comment es undefined o null
      evaluationStatusID: rubric.evaluationStatusID || 2, // Usar 2 si evaluationStatusID es falsy
    };
  
    dispatch(setNewItem(newItemData));
    openModal();
  };
  

  const handleVerification = async (message) => {
    // Buscar el label correspondiente al evaluationStatusID en el estado evaluationStatus
    const evaluationStatusName = evaluationStatus.find(status => status.value === newItem.evaluationStatusID)?.label;

    // Actualizar rubric con el nuevo nombre del estado de evaluación
    // Asegúrate de actualizar esta parte según cómo estés almacenando y utilizando los datos de rubric en tu aplicación
    dispatch(setItems({
      ...rubric,
      comment: newItem.comment,
      evaluationStatusID: newItem.evaluationStatusID,
      name: evaluationStatusName,
      grade1: parseFloat(newItem.grade1).toFixed(1),
    }));

    showAlert({
      type: 'verification',
      content: message,
    });
    closeModal();
  };


  const responseHandler = (response) => {
    ResponseHandler({
      showAlert,
      response,
      navigate,
      onVerification: handleVerification,
    });
  };

  const closeModalEvent = () => {
    setEventType(0);
  };

  const { modalOpen, openModal, closeModal } = useModal(false, {
    onClose: closeModalEvent,
  });

  const handleInputChange = useCallback((field, value) => {
    dispatch(setNewItem({ [field]: value }));
  }, [dispatch]);

  // Determina el contenido del modal en función del eventType
  const getModalContent = () => {
    switch (eventType) {
      case 1:
        return (
          <FormContainerNotUpdate
            message="Finalizar Evaluación"
            secondaryMessage=""
            messageButton="Finalizar Evaluación"
            customPath={<EditIcon />}
            handleSubmit={handleSuccess}
            closeModal={closeModal}
          >
            {parseInt(evaluationTypeID, 10) === 1 ?
              <SearchSelect
                options={evaluationStatus}
                value={newItem.evaluationStatusID}
                onChange={(selectedOption) => handleInputChange('evaluationStatusID', selectedOption.value)}
                placeholder="Selecciona un Estado de Evaluación"
                selectId="evaluationStatusID"
              />
              :
              <TextInput
                label={'Nota de la Evaluación'}
                inputId='grade1'
                value={newItem.grade1}
                onChange={(e) => handleInputChange('grade1', e.target.value)}
                placeholder={`Ingresar Nota de la Evaluación (Entre 1.0 a 7.0)`}
              />
            }
            <TextArea
              inputId='comment'
              value={newItem.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              placeholder={parseInt(evaluationTypeID, 10) === 1 ? 'Ingresar Sugerencias de Mejora' : 'Ingresar Otras Observaciones'}
            />
          </FormContainerNotUpdate>
        );
      case 2:
        return (
          <FormContainerNotUpdate
            message="Añadir Plantilla"
            secondaryMessage=""
            messageButton="Añadir Plantilla"
            customPath={<CreateIcon />}
            handleSubmit={handleSuccess}
            closeModal={closeModal}
          >
          </FormContainerNotUpdate>
        );
      default:
        return <div>No hay evento seleccionado</div>;
    }
  };

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}

      <ModalCRUD isOpen={modalOpen}>{getModalContent()}</ModalCRUD>

      <div className="grid grid-cols-2 flex-col items-center gap-2 md:justify-between mb-4">
        <div className="col-span-full sm:col-span-1 text-center md:text-start">
          <h1 className="text-2xl sm:text-3xl font-semibold leading-relaxed text-gray-900">
            {title}
          </h1>
          <p className="text-md sm:text-sm font-medium text-gray-500">
            Sistema Administrativo
          </p>
        </div>

        <div className="col-span-full sm:col-span-1 flex items-center w-full gap-1 md:flex-row md:justify-end">
          <div className='flex-1'>
            <StyledButton
              onClick={() => openModalEvent(1)}
              height="10"
            >
              <EditIcon />
              Finalizar Evaluación
            </StyledButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default RubricListHeader;
