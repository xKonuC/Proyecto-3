import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Acciones de Redux para gestionar el estado global de las rúbricas
import {
  setItems
} from '../../../redux/slice/handleRubric/templateOverview/templateOverviewSlice';

import StyledButton from '../../button/styledButton';
import CreateIcon from '../../icon/crud/createIcon';
import useModal from '../../modal/useModal';
import ModalCRUD from '../../modal/modalCRUD';
import FormContainerNotUpdate from '../body/formContainerNotUpdate';
import SearchSelect from '../../input/searchSelect';
import { handleAddSection } from '../../../utils/crudHelpers/handleRubric/templateUtils';

const TemplateListHeader = ({ sectionSelect }) => {
  const dispatch = useDispatch(); // Hook de Redux para despachar acciones al store
  const { items: template } = useSelector((state) => state.handleRubric.templateOverview);

  // Estados locales para almacenar datos de nuevas secciones y preguntas
  const [selectedSection, setSelectedSection] = useState(null);
  const [eventType, setEventType] = useState(0);

  const handleSuccess = async (event) => {
    event.preventDefault();
    if (eventType === 1) {
      handleAddSection(selectedSection, template, dispatch, setItems, setSelectedSection);
    }
    closeModal();
  };

  const openModalEvent = (eventType) => {
    setEventType(eventType);
    openModal();
  };

  const closeModalEvent = () => {
    setSelectedSection(null);
    setEventType(0);
  };

  const { modalOpen, openModal, closeModal } = useModal(false, {
    onClose: closeModalEvent,
  });

  // Determina el contenido del modal en función del eventType
  const getModalContent = () => {
    switch (eventType) {
      case 1:
        return (
          <FormContainerNotUpdate
            message="Añadir Sección"
            secondaryMessage=""
            messageButton="Añadir Sección"
            customPath={<CreateIcon />}
            handleSubmit={handleSuccess}
            closeModal={closeModal}
          >
            <SearchSelect
              options={sectionSelect}
              value={selectedSection}
              onChange={(selectedOption) => setSelectedSection(selectedOption)}
              placeholder="Selecciona una sección"
              selectId={`selectSectionID`}
            />
          </FormContainerNotUpdate>
        );
      default:
        return <div>No hay evento seleccionado</div>;
    }
  };

  return (
    <>
      <ModalCRUD isOpen={modalOpen}>{getModalContent()}</ModalCRUD>

      <div className="grid grid-cols-3 flex-col items-center gap-2 md:justify-between mb-4">
        <div className="col-span-full sm:col-span-2 text-center md:text-start">
          <h1 className="text-2xl sm:text-3xl font-semibold leading-relaxed text-gray-900">
            Bienvenido a Administración de Plantillas de Rúbrica
          </h1>
          <p className="text-md sm:text-sm font-medium text-gray-500">
            Sistema Administrativo
          </p>
        </div>

        <div className="col-span-full sm:col-span-1 flex-col items-center w-full gap-1 md:flex-row md:justify-end">
            <StyledButton
              onClick={() => openModalEvent(1)}
              height="10"
            >
              <CreateIcon />
              Añadir Sección
            </StyledButton>
        </div>
      </div>
    </>
  );
};

export default TemplateListHeader;
