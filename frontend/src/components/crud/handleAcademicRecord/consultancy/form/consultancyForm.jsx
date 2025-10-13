import React, { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleAcademicRecord/consultancy/consultancySlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';

// Constantes

const ConsultancyForm = memo(({ updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleAcademicRecord.consultancy);
    const { userID } = useParams();

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ consultancyID: updateId, ...newItem, userID });
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
                            inputId='title'
                            label='Titulo'
                            value={newItem.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                            placeholder='Ingresar Titulo'
                        />
                    </div>
                    <div className='flex-1'>
                        <TextInput
                            inputId='contractingInstitution'
                            label='Institución Contratante'
                            value={newItem.contractingInstitution}
                            onChange={(e) => handleInputChange('contractingInstitution', e.target.value)}
                            placeholder='Ingresar Institución Contratante'
                        />
                    </div>
                </div>
                <div className="flex gap-1 sm:gap">
                    <div className='flex-1'>
                        <TextInput
                            inputId='grantYear'
                            label='Año de adjudicación'
                            value={newItem.grantYear}
                            onChange={(e) => handleInputChange('grantYear', e.target.value)}
                            placeholder='Ingresar Año de adjudicación'
                        />
                    </div>
                    <div className='flex-1'>
                        <TextInput
                            inputId='executionPeriod'
                            label='Periodo de Ejecución'
                            value={newItem.executionPeriod}
                            onChange={(e) => handleInputChange('executionPeriod', e.target.value)}
                            placeholder='Ingresar Periodo de Ejecución'
                        />
                    </div>
                </div>
                <TextInput
                    inputId='objective'
                    label='Objetivo'
                    value={newItem.objective}
                    onChange={(e) => handleInputChange('objective', e.target.value)}
                    placeholder='Ingresar Objetivo'
                />
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

export default ConsultancyForm;
