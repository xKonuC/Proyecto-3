import React, { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleAcademicRecord/patent/patentSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import DateInput from '../../../../input/dateInput';
import DynamicSelect from '../../../../input/dynamicSelect';

import { validStatus } from '../../../../../utils/crudHelpers/constants';

const PatentForm = memo(({ updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleAcademicRecord.patent);
    const { userID } = useParams();

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Restar un día si es una actualización
        let updatedItem = { ...newItem };
        if (updateId !== null) {
            const applicationDate = new Date(updatedItem.applicationDate);
            const publicationDate = new Date(updatedItem.publicationDate);

            // Restar un día a las fechas
            applicationDate.setDate(applicationDate.getDate() - 1);
            publicationDate.setDate(publicationDate.getDate() - 1);

            // Asignar las fechas ajustadas
            updatedItem = {
                ...updatedItem,
                applicationDate: applicationDate.toISOString().split('T')[0],
                publicationDate: publicationDate.toISOString().split('T')[0],
            };

            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ patentID: updateId, ...updatedItem, userID });
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
                            inputId='inventors'
                            label='Inventor(es)'
                            value={newItem.inventors}
                            onChange={(e) => handleInputChange('inventors', e.target.value)}
                            placeholder='Ingresar Inventor(es)'
                        />
                    </div>
                    <div className='flex-1'>
                        <TextInput
                            inputId='patentName'
                            label='Nombre de la Patente'
                            value={newItem.patentName}
                            onChange={(e) => handleInputChange('patentName', e.target.value)}
                            placeholder='Ingresar Nombre de la Patente'
                        />
                    </div>
                </div>
                <DateInput
                    selectId={'applicationDate'}
                    placeholderText={'Selecciona una Fecha de Solicitud'}
                    dateFormat="dd/MM/yyyy"
                    showTime={false}
                    value={newItem.applicationDate}
                    onChange={(selectedDate) => handleInputChange('applicationDate', selectedDate)}
                />
                <DateInput
                    selectId={'publicationDate'}
                    placeholderText={'Selecciona una Fecha de Publicación'}
                    dateFormat="dd/MM/yyyy"
                    showTime={false}
                    value={newItem.publicationDate}
                    onChange={(selectedDate) => handleInputChange('publicationDate', selectedDate)}
                />
                <div className="flex gap-1 sm:gap">
                    <div className='flex-1'>
                        <TextInput
                            inputId='registration-Number'
                            label='Número de Registro'
                            value={newItem.registrationNumber}
                            onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                            placeholder='Ingresar Número de Registro'
                        />
                    </div>
                    <div className='flex-1'>
                        <DynamicSelect
                            selectId='status'
                            label="Seleccione Estado"
                            options={validStatus}
                            value={newItem.status}
                            onChange={(e) => handleInputChange('status', e.target.value)}
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

export default PatentForm;
