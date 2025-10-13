import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleRubric/template/templateSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';

import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';
import TextArea from '../../../../input/textArea';

const TemplateForm = memo(({ url, updateId, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleRubric.template);

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ templateID: updateId, ...newItem });
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
                        inputId='name'
                        label={'Nombre de Plantilla*'}
                        value={newItem.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder={`Ingresar Nombre de la Plantilla`}
                    />
                    <TextArea
                        inputId='description'
                        label={'Descripción'}
                        value={newItem.description}
                        onChange={(e) => handleInputChange('description', e.target.value)}
                        placeholder={`Ingresar Descripción de la Plantilla`}
                    />
                </FormContainer>
            </ModalCRUD>
        </>
    );
});

export default TemplateForm;
