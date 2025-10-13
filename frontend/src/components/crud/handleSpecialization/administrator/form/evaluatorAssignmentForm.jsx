/* eslint-disable eqeqeq */
import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleSpecialization/administrative/evaluatorAssignmentSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

import FormContainer from '../../../../forms/body/formContainer';
import SearchSelect from '../../../../input/searchSelect';

const EvaluatorAssignmentForm = memo(({ academics, administrative, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
  const dispatch = useDispatch();
  const { newItem } = useSelector((state) => state.handleSpecialization.administrative.evaluatorAssignment);

  // Función para manejar el envío de datos (submit)
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newItem.isUpdate !== null) {
      const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
      await updateService.execute({ ...newItem });
    } else {
      const createService = new CreateService(url, itemName, showAlert, responseHandler);
      await createService.execute({ ...newItem });
    }
  };

  const handleInputChange = useCallback((field, value) => {
    dispatch(setNewItem({ [field]: value }));
  }, [dispatch]);

  return (
    <ModalCRUD isOpen={modalOpen}>
      <FormContainer
        createMessage={`Asignar Académicos`}
        create2Message={`Asignación de Académicos`}
        updateMessage={`Actualizar Académicos`}
        update2Message={`Actualización de Académicos`}
        updateId={newItem.isUpdate}
        itemName={itemName}
        handleSubmit={handleSubmit}
        closeModal={closeModal}
      >
        {(newItem.stage === 1) &&
          (<>
            <SearchSelect
              selectId='evaluator1_userID'
              placeholder="Seleccionar un Evaluador A"
              options={academics}
              value={newItem.evaluator1_userID}
              onChange={(selectedOption) => handleInputChange('evaluator1_userID', selectedOption.value)}
            />
            <SearchSelect
              selectId='evaluator2_userID'
              placeholder="Seleccionar un Evaluador B"
              options={academics}
              value={newItem.evaluator2_userID}
              onChange={(selectedOption) => handleInputChange('evaluator2_userID', selectedOption.value)}
            />
          </>)
        }
        {(newItem.stage === 2) &&
          (<>
            <SearchSelect
              selectId='evaluator1_userID'
              placeholder="Seleccionar un Director"
              options={administrative}
              value={newItem.evaluator1_userID}
              onChange={(selectedOption) => handleInputChange('evaluator1_userID', selectedOption.value)}
            />
          </>)
        }
        {(newItem.stage === 3) &&
          (<>
            <SearchSelect
              selectId='evaluator1_userID'
              placeholder="Seleccionar un Co-Director"
              options={administrative}
              value={newItem.evaluator1_userID}
              onChange={(selectedOption) => handleInputChange('evaluator1_userID', selectedOption.value)}
            />
          </>)
        }
        {(newItem.stage === 4) &&
          (<>
            <SearchSelect
              selectId='evaluator1_userID'
              placeholder="Seleccionar un Director de Programa"
              options={administrative}
              value={newItem.evaluator1_userID}
              onChange={(selectedOption) => handleInputChange('evaluator1_userID', selectedOption.value)}
            />
          </>)
        }
      </FormContainer>
    </ModalCRUD>
  );
});

export default EvaluatorAssignmentForm;
