import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleTitle/university/universitySlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';

import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';

const UniversityForm = memo(({ url, updateId, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleTitle.university);

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ universityID: updateId, ...newItem });
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
        <ModalCRUD isOpen={modalOpen}>
            <FormContainer updateId={updateId} itemName={itemName} pText={''} handleSubmit={handleSubmit} closeModal={closeModal}>
                <TextInput
                    inputId='name'
                    label={'Nombre de la Universidad*'}
                    value={newItem.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={`Ingresar Nombre de la Universidad`}
                />
                <TextInput
                    inputId='city'
                    label={'Ciudad'}
                    value={newItem.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    placeholder={`Ingresar Ciudad`}
                />
                <TextInput
                    inputId='country'
                    label={'País*'}
                    value={newItem.country}
                    onChange={(e) => handleInputChange('country', e.target.value)}
                    placeholder={`Ingresar País`}
                />
            </FormContainer>
        </ModalCRUD>
    );
});

export default UniversityForm;
