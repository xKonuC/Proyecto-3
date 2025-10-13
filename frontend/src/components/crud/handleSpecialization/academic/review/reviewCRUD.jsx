import React, { Suspense, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../../../../redux/slice/handleSpecialization/administrative/evaluatorAssignmentSlice';

// Componentes personalizados
import ModalReview from '../../../../modal/modalReview';
import HandleAlert from '../../../../alert/handleAlert';

import ResponseHandler from '../../../../../utils/crudHelpers/responseHandler';
import useModal from '../../../../modal/useModal';

import ProjectReviewForm from '../form/projectReviewForm';
import StyledButton from '../../../../button/styledButton';

// Utilidades
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

//Estilos
import { FaEdit } from 'react-icons/fa';

const ReviewCRUD = ({ url, matchesAcademicA, item }) => {
  // Estado local del componente
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.handleSpecialization.administrative.evaluatorAssignment);
  const [alertComponent, showAlert] = HandleAlert();

  const [newItem, setNewItem] = useState({
    preprojectEvaluatorID: '',
    evaluationStatusID: null,
    comment1: '',
    comment2: '',
    comment3: '',
    comment4: '',
    comment5: '',
    comment6: '',
    comment7: '',
  });

  // -------------------------------Funciones Para CRUD-------------------------------

  // Función para manejar el envío de datos (submit)
  const handleUpdate = async (event) => {
    event.preventDefault();
    // Verificar y actualizar el estado del Anteproyecto si ambos estados academicA_statusID y academicB_statusID son 2(Sin revisión)
    const updateService = new UpdateService(url, 'Usuario', showAlert, responseHandler);
    await updateService.execute({ ...newItem, userID: matchesAcademicA ? item.academicA_userID : item.academicB_userID, reviewCompleted: (item.academicA_statusID === 2 && item.academicB_statusID === 2) ? true : false });
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
    const updatedItems = items.map((i) => {
      if (i.evaluationID === item.evaluationID) {
        const isAcademicA = matchesAcademicA;
        const statusKeyID = isAcademicA ? 'academicA_statusID' : 'academicB_statusID';
        const statusKey = isAcademicA ? 'academicA_status' : 'academicB_status';

        // Se actualizan los estados a 7 (Anteproyecto revisado), el cual le indica al estudiante que fue revisado
        const updatedItem = {
          ...i,
          [statusKeyID]: 7,
          [statusKey]: 'Anteproyecto revisado',
        };

        // Verificar y actualizar el estado del Anteproyecto si ambos estados academicA_statusID y academicB_statusID son 2(Sin revisión)
        if (item.academicA_statusID === 2 && item.academicB_statusID === 2) {
          updatedItem.preproject_statusID = 7;
          updatedItem.preproject_status = 'Anteproyecto revisado';
        }

        const commentKeys = isAcademicA
          ? ['academicA_comment1', 'academicA_comment2', 'academicA_comment3', 'academicA_comment4', 'academicA_comment5', 'academicA_comment6', 'academicA_comment7']
          : ['academicB_comment1', 'academicB_comment2', 'academicB_comment3', 'academicB_comment4', 'academicB_comment5', 'academicB_comment6', 'academicB_comment7'];

        commentKeys.forEach((key, index) => {
          updatedItem[key] = newItem[`comment${index + 1}`] || '';
        });

        return updatedItem;
      }
      return i;
    });

    dispatch(setItems(updatedItems));

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

  const onOpen = () => {
    // Set the state with the new item data
    setNewItem({
      preprojectEvaluatorID: matchesAcademicA ? item.academicA_preprojectEvaluatorID : item.academicB_preprojectEvaluatorID,
      evaluationID: item.evaluationID,
      comment1: matchesAcademicA ? item.academicA_comment1 : item.academicB_comment1,
      comment2: matchesAcademicA ? item.academicA_comment2 : item.academicB_comment2,
      comment3: matchesAcademicA ? item.academicA_comment3 : item.academicB_comment3,
      comment4: matchesAcademicA ? item.academicA_comment4 : item.academicB_comment4,
      comment5: matchesAcademicA ? item.academicA_comment5 : item.academicB_comment5,
      comment6: matchesAcademicA ? item.academicA_comment6 : item.academicB_comment6,
      comment7: matchesAcademicA ? item.academicA_comment7 : item.academicB_comment7,
    });
  };

  const handleInputChange = (field, value) => {
    setNewItem((prev) => ({ ...prev, [field]: value }));
  };

  // -------------------------------Funciones para los Modal-------------------------------
  const { modalOpen, openModal, closeModal } = useModal(
    false,
    {
      onOpen,
    },
  );

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}

      {/* Modal para Asignación de Permisos */}
      <Suspense>
        <ModalReview isOpen={modalOpen} pdfUrl={item.projectURL}>
          <ProjectReviewForm
            newItem={newItem}
            handleInputChange={handleInputChange}
            handleUpdate={handleUpdate}
            closeModal={closeModal}
          />
        </ModalReview>
      </Suspense>

      {/* Botón para Asignación de Permisos */}
      <StyledButton onClick={openModal} >
        <FaEdit size={20} />
        Revisar como {matchesAcademicA ? ' 1° ': ' 2° '} Evaluador
      </StyledButton>

    </>
  );
};

export default ReviewCRUD;