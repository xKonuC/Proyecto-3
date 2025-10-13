import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleRubric/section/sectionSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';

import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

const SectionForm = memo(({ url, updateId, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleRubric.section);

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ sectionID: updateId, ...newItem });
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
                        label={'Nombre de la Sección*'}
                        value={newItem.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        placeholder={`Ingresar Nombre de la Sección`}
                    />
                </FormContainer>
            </ModalCRUD>
        </>
    );
});

export default SectionForm;
