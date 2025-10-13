import React, { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleAcademicRecord/guidedThesis/guidedThesisSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import DynamicSelect from '../../../../input/dynamicSelect';

// Constantes
import { validRole, validSameProgram, validGuidedThesisType } from '../../../../../utils/crudHelpers/constants';

const GuidedThesisForm = memo(({ updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleAcademicRecord.guidedThesis);
    const { userID } = useParams();

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ guidedThesisID: updateId, ...newItem, userID });
        } else {
            const createService = new CreateService(url, itemName, showAlert, responseHandler);
            await createService.execute(
                { ...newItem, userID }
            );
        }
    };

    const handleInputChange = useCallback((field, value) => {
        dispatch(setNewItem({ [field]: value }));
    }, [dispatch]);

    return (
        <ModalCRUD isOpen={modalOpen}>
            <FormContainer updateId={updateId} itemName={itemName} handleSubmit={handleSubmit} closeModal={closeModal}>
                <div className="flex gap-1 sm:gap">
                    <div className='flex-1'>
                        <TextInput
                            inputId='author'
                            label='Author'
                            value={newItem.author}
                            onChange={(e) => handleInputChange('author', e.target.value)}
                            placeholder='Ingresar Autor'
                        />
                    </div>
                    <div className='flex-1'>
                        <TextInput
                            inputId='year'
                            label='Año'
                            value={newItem.year}
                            onChange={(e) => handleInputChange('year', e.target.value)}
                            placeholder='Ingresar Año'
                        />
                    </div>
                </div>
                <div className="flex gap-1 sm:gap">
                    <div className='flex-1'>
                        <DynamicSelect
                            selectId='type'
                            label="Seleccione Tipo"
                            options={validGuidedThesisType}
                            value={newItem.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                        />
                    </div>
                    <div className='flex-1'>
                        <DynamicSelect
                            selectId='role'
                            label="Seleccione Rol"
                            options={validRole}
                            value={newItem.role}
                            onChange={(e) => handleInputChange('role', e.target.value)}
                        />
                    </div>
                </div>
                <div className="flex gap-1 sm:gap">
                    <div className='flex-1'>
                        <TextInput
                            inputId='title'
                            label='Titulo'
                            value={newItem.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder='Ingresar Titulo'
                        />
                    </div>
                    <div className='flex-1'>
                        <TextInput
                            inputId='program'
                            label='Programa'
                            value={newItem.program}
                            onChange={(e) => handleInputChange('program', e.target.value)}
                            placeholder='Ingresar Programa'
                        />
                    </div>
                </div>
                <div className="flex gap-1 sm:gap">
                    <div className='flex-1'>
                        <TextInput
                            inputId='institution'
                            label='Institución'
                            value={newItem.institution}
                            onChange={(e) => handleInputChange('institution', e.target.value)}
                            placeholder='Ingresar Institución'
                        />
                    </div>
                    <div className='flex-1'>
                        <DynamicSelect
                            selectId='SameProgram'
                            label="¿Pertenece al mismo Programa?"
                            options={validSameProgram}
                            value={newItem.sameProgram}
                            onChange={(e) => handleInputChange('sameProgram', e.target.value)}
                        />
                    </div>
                </div>
                <TextInput
                    inputId='accessURL'
                    label='URL de Acceso'
                    value={newItem.accessURL}
                    onChange={(e) => handleInputChange('accessURL', e.target.value)}
                    placeholder='Ingresar URL de Acceso'
                />
            </FormContainer>
        </ModalCRUD>
    );
});

export default GuidedThesisForm;
