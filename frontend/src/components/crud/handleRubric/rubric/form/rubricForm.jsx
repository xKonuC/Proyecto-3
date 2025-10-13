import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Componentes
import { setNewItem } from '../../../../../redux/slice/handleRubric/rubric/rubricSlice';
import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import TextArea from '../../../../input/textArea';
import ModalCRUD from '../../../../modal/modalCRUD';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

const RubricForm = memo(({ updateId, evaluationID, studentHasSemesterID, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleRubric.rubric);

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ rubricID: updateId, studentHasSemesterID, ...newItem });
        } else {
            const createService = new CreateService(url, itemName, showAlert, responseHandler);

            await createService.execute(
                { ...newItem, evaluationID, studentHasSemesterID }
            );
        }
    };

    const handleInputChange = useCallback((field, value) => {
        dispatch(setNewItem({ [field]: value }));
    }, [dispatch]);

    return (
        <ModalCRUD isOpen={modalOpen}>
            <FormContainer updateId={updateId} itemName={itemName} handleSubmit={handleSubmit} closeModal={closeModal}>
                <TextInput
                    inputId='rubricName'
                    label={'Nombre de la Rúbrica*'}
                    value={newItem.rubricName}
                    onChange={(e) => handleInputChange('rubricName', e.target.value)}
                    placeholder={`Ingresar Nombre de la Rúbrica`}
                />
                <TextArea
                    inputId='description'
                    value={newItem.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder={`Ingresar Descripción`}
                />
                <TextArea
                    inputId='comment'
                    value={newItem.comment}
                    onChange={(e) => handleInputChange('comment', e.target.value)}
                    placeholder={`Ingresar Sugerencias de Mejora`}
                />
            </FormContainer>
        </ModalCRUD>
    );
});

export default RubricForm;
