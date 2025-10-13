import React, { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleAcademicRecord/project/projectSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import DynamicSelect from '../../../../input/dynamicSelect';

// Constantes
import { validProjectRole, validProjectType } from '../../../../../utils/crudHelpers/constants';

const ProjectForm = memo(({ updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleAcademicRecord.project);
    const { userID } = useParams();

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ projectID: updateId, ...newItem, userID });
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
                <TextInput
                    inputId='title'
                    label='Título'
                    value={newItem.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    placeholder='Ingresar Título'
                />
                <DynamicSelect
                    selectId='type'
                    label="Seleccione Tipo de Proyectos"
                    options={validProjectType}
                    value={newItem.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                />
                <div className="flex gap-1 sm:gap">
                    <div className='flex-1'>
                        <TextInput
                            inputId='role'
                            label='Rol Desempeñado'
                            value={newItem.role}
                            onChange={(e) => handleInputChange('role', e.target.value)}
                            placeholder='Ingresar Rol Desempeñado'
                        />
                    </div>
                    <div className='flex-2'>
                        <DynamicSelect
                            selectId='role-select'
                            label="Ingresar Otro Tipo de Rol Desempeñado"
                            options={validProjectRole}
                            value={newItem.role}
                            onChange={(e) => handleInputChange('role', e.target.value)}
                        />
                    </div>
                </div>
                <TextInput
                    inputId='fundingSource'
                    label='Fuente de Financiación'
                    value={newItem.fundingSource}
                    onChange={(e) => handleInputChange('fundingSource', e.target.value)}
                    placeholder='Ingresar Fuente de Financiación'
                />
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

export default ProjectForm;
