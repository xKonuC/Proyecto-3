import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleTitle/title/titleSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';

import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import DynamicSelect from '../../../../input/dynamicSelect';

// Constantes
import { validArea, validDepartmentTitle } from '../../../../../utils/crudHelpers/constants';
import SearchSelect from '../../../../input/searchSelect';

const TitleForm = memo(({ degree, university, url, updateId, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleTitle.title);

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ titleID: updateId, ...newItem });
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
                    inputId='itemNameTitle'
                    label={'Titulo*'}
                    value={newItem.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={`Ingresar Nombre del Título`}
                />
                <SearchSelect
                    selectId='areaID'
                    placeholder="Seleccione Área del Título"
                    options={validArea}
                    value={newItem.areaID}
                    onChange={(selectedOption) => handleInputChange('areaID', selectedOption.value)}
                />
                <SearchSelect
                    selectId='degreeID'
                    placeholder="Seleccione Tipo*"
                    options={degree}
                    value={newItem.degreeID}
                    onChange={(selectedOption) => handleInputChange('degreeID', selectedOption.value)}
                />
                <SearchSelect
                    selectId='universityID'
                    placeholder="Seleccione Universidad*"
                    options={university}
                    value={newItem.universityID}
                    onChange={(selectedOption) => handleInputChange('universityID', selectedOption.value)}
                />
            </FormContainer>
        </ModalCRUD>
    );
});

export default TitleForm;
