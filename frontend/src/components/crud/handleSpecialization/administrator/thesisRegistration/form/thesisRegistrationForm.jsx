import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../../redux/slice/handleSpecialization/administrative/thesisRegistrationSlice';

// Componentes
import ModalCRUD from '../../../../../modal/modalCRUD';
import CreateService from '../../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../../utils/crudHelpers/service/baseService/updateService';

import FormContainer from '../../../../../forms/body/formContainer';
import TextInput from '../../../../../input/textInput';
import SearchSelect from '../../../../../input/searchSelect';

const ThesisRegistrationForm = memo(({ student, administrative, updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleSpecialization.administrative.thesisRegistration);

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ thesisRegistrationID: updateId, ...newItem });
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
            <FormContainer updateId={updateId} itemName={itemName} handleSubmit={handleSubmit} closeModal={closeModal}>
                <TextInput
                    inputId='title'
                    label='Titulo'
                    value={newItem.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder='Ingresar Titulo'
                />
                <SearchSelect
                    selectId='studentID'
                    placeholder="Seleccionar un Estudiante"
                    options={student}
                    value={newItem.studentID}
                    onChange={(selectedOption) => handleInputChange('studentID', selectedOption.value)}
                />
                <SearchSelect
                    selectId='directorID'
                    placeholder="Seleccionar un Director"
                    options={administrative}
                    value={newItem.directorID}
                    onChange={(selectedOption) => handleInputChange('directorID', selectedOption.value)}
                />
                <SearchSelect
                    selectId='codirectorID'
                    placeholder="Seleccionar un Co-Director"
                    options={administrative}
                    value={newItem.codirectorID}
                    onChange={(selectedOption) => handleInputChange('codirectorID', selectedOption.value)}
                />
            </FormContainer>
        </ModalCRUD>
    );
});

export default ThesisRegistrationForm;
