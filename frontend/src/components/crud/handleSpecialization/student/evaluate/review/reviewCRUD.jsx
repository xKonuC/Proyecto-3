import React, { Suspense, useState } from 'react';
import { useNavigate } from "react-router-dom";

// Componentes personalizados
import ModalReview from '../../../../../modal/modalReview';
import HandleAlert from '../../../../../alert/handleAlert';

import useModal from '../../../../../modal/useModal';
import FetchService from '../../../../../../utils/crudHelpers/service/baseService/fetchService';
import ResponseHandler from '../../../../../../utils/crudHelpers/responseHandler';

import ReadOnlyProjectReviewForm from '../../../administrator/form/readOnlyProjectReviewForm';
import StyledButton from '../../../../../button/styledButton';

//Estilos
import { FaEdit } from 'react-icons/fa';

const ReviewCRUD = ({ item, evaluatorCategoryID, url }) => {
  // Estado local del componente
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

  const [newItem, setNewItem] = useState({
    preprojectEvaluatorID: '',
    comment1: '',
    comment2: '',
    comment3: '',
    comment4: '',
    comment5: '',
    comment6: '',
    comment7: '',
    projectURL: null,
  });

  // Función para manejar las respuestas de los servicios
  const responseHandler = (response) => {
    ResponseHandler({
      showAlert,
      navigate,
      response,
      onData: handleData,
      onRenewal: handleRenewal,
    });
  };

  // Función para manejar los datos obtenidos
  const handleData = (data) => {
    // Desestructurar el objeto data para obtener directamente los valores necesarios
    const { comment1, comment2, comment3, comment4, comment5, comment6, comment7 } = data[0];
    
    // Actualizar el estado local
    setNewItem({
      comment1,
      comment2,
      comment3,
      comment4,
      comment5,
      comment6,
      comment7,
    });
  };  
  
  // Función para manejar la renovación
  const handleRenewal = async (message) => {
    showAlert({
      type: 'verification',
      content: message,
    });
  };

  const onOpen = async () => {
    const fetchRubricHasQuestionService = new FetchService(url, 'Comentarios', showAlert, responseHandler);
    await fetchRubricHasQuestionService.execute({
      evaluationID: item.evaluationID,
      studentHasSemesterID: item.studentHasSemesterID,
      evaluatorCategoryID,
    });
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
          <ReadOnlyProjectReviewForm
            newItem={newItem}
            closeModal={closeModal}
          />
        </ModalReview>
      </Suspense>

      {/* Botón para Asignación de Permisos */}
      <StyledButton onClick={openModal} >
        <FaEdit size={20} />
        Ver Revision {evaluatorCategoryID === 2 ? 'Del Evaluador A' : 'Del Evaluador B'}
      </StyledButton>

    </>
  );
};

export default ReviewCRUD;