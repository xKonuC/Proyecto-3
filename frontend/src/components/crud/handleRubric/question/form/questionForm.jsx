import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleRubric/question/questionSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';

import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

const QuestionForm = memo(({ url, updateId, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleRubric.question);

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ questionID: updateId, ...newItem });
        } else {
            const createService = new CreateService(url, itemName, showAlert, responseHandler);
            await createService.execute(
                { ...newItem }
            );
        }
    };

    const handleInputChange = useCallback((field, value) => {
        dispatch(setNewItem({ [field]: value }));
    }, [dispatch]);

    return (
        <>
            <ModalCRUD isOpen={modalOpen}>
                <FormContainer updateId={updateId} itemName={itemName} handleSubmit={handleSubmit} closeModal={closeModal}>
                    <TextInput
                        inputId='question'
                        label={'Texto de la Pregunta*'}
                        value={newItem.question}
                        onChange={(e) => handleInputChange('question', e.target.value)}
                        placeholder={`Ingresar texto de la Pregunta`}
                    />
                </FormContainer>
            </ModalCRUD>
        </>
    );
});

export default QuestionForm;
