import React, { Suspense, useState } from 'react';
import { useNavigate } from "react-router-dom";

// Componentes personalizados
import ModalReview from '../../../../modal/modalReview';
import HandleAlert from '../../../../alert/handleAlert';

import useModal from '../../../../modal/useModal';

import ReadOnlyProjectReviewForm from '../form/readOnlyProjectReviewForm';
import StyledButton from '../../../../button/styledButton';

//Estilos
import { FaEdit } from 'react-icons/fa';

const ReviewCRUD = ({ matchesAcademicA, item }) => {
  // Estado local del componente
  const navigate = useNavigate();
  const [alertComponent] = HandleAlert();

  const [newItem, setNewItem] = useState({
    preprojectEvaluatorID: '',
    comment1: '',
    comment2: '',
    comment3: '',
    comment4: '',
    comment5: '',
    comment6: '',
    comment7: '',
  });

  const onOpen = () => {
    // Determine which evaluator and status to use based on matchesAcademicA
    const preprojectEvaluatorID = matchesAcademicA ? item.academicA_preprojectEvaluatorID : item.academicB_preprojectEvaluatorID;

    setNewItem({
      preprojectEvaluatorID: preprojectEvaluatorID,
      comment1: matchesAcademicA ? item.academicA_comment1 : item.academicB_comment1,
      comment2: matchesAcademicA ? item.academicA_comment2 : item.academicB_comment2,
      comment3: matchesAcademicA ? item.academicA_comment3 : item.academicB_comment3,
      comment4: matchesAcademicA ? item.academicA_comment4 : item.academicB_comment4,
      comment5: matchesAcademicA ? item.academicA_comment5 : item.academicB_comment5,
      comment6: matchesAcademicA ? item.academicA_comment6 : item.academicB_comment6,
      comment7: matchesAcademicA ? item.academicA_comment7 : item.academicB_comment7,
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
        {matchesAcademicA ? 'Ver Revisión A' : 'Ver Revisión B'}
      </StyledButton>

    </>
  );
};

export default ReviewCRUD;