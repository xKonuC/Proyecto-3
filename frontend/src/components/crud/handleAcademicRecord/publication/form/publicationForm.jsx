import React, { memo, useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleAcademicRecord/publication/publicationSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import DynamicSelect from '../../../../input/dynamicSelect';

// Constantes
import { validIsIndexed, validPublicationType, validStatus } from '../../../../../utils/crudHelpers/constants';

const PublicationForm = memo(({ updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleAcademicRecord.publication);
    const { userID } = useParams();

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ publicationID: updateId, ...newItem, userID });
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

    // Efecto para actualizar `type` basado en `isIndexed`
    useEffect(() => {
        if (newItem.isIndexed == 1) {
            dispatch(setNewItem({ type: 'WoS' }));
        } else {
            dispatch(setNewItem({ type: '' }));
        }
    }, [newItem.isIndexed, dispatch]);

    return (
        <ModalCRUD isOpen={modalOpen}>
            <FormContainer updateId={updateId} itemName={itemName} handleSubmit={handleSubmit} closeModal={closeModal}>
                <div className="flex gap-1 sm:gap">
                    <div className='flex-1'>
                        <TextInput
                            inputId='authors'
                            label='Autor(es)'
                            value={newItem.authors}
                            onChange={(e) => handleInputChange('authors', e.target.value)}
                            placeholder='Ingresar Autor(es)'
                        />
                    </div>
                    <div className='flex-1'>
                        <TextInput
                            inputId='leadAuthor'
                            label='Autor Principal'
                            value={newItem.leadAuthor}
                            onChange={(e) => handleInputChange('leadAuthor', e.target.value)}
                            placeholder='Ingresar Autor Principal'
                        />
                    </div>
                </div>
                <div className="flex gap-1 sm:gap">
                    <div className='flex-1'>
                        <TextInput
                            inputId='year'
                            label='Año'
                            value={newItem.year}
                            onChange={(e) => handleInputChange('year', e.target.value)}
                            placeholder='Ingresar Año'
                        />
                    </div>
                    <div className='flex-1'>
                        <DynamicSelect
                            selectId='isIndexed'
                            label="¿Esta Indexado?"
                            options={validIsIndexed}
                            value={newItem.isIndexed}
                            onChange={(e) => handleInputChange('isIndexed', e.target.value)}
                        />
                    </div>
                </div>
                {(newItem.isIndexed !== "" && newItem.isIndexed == 1) &&
                    <div className="flex gap-1 sm:gap">
                        <div className='flex-1'>
                            <TextInput
                                inputId='type'
                                label='Tipo de Indexación'
                                value={newItem.type}
                                onChange={(e) => handleInputChange('type', e.target.value)}
                                placeholder='Ingresar Tipo de Indexación'
                            />
                        </div>
                        <div className='flex-2'>
                            <DynamicSelect
                                selectId='type'
                                label="Ingresar Otro Tipo de Indexación"
                                options={validPublicationType}
                                value={newItem.type}
                                onChange={(e) => handleInputChange('type', e.target.value)}
                            />
                        </div>
                    </div>
                }
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
                            inputId='journal'
                            label='Revista'
                            value={newItem.journal}
                            onChange={(e) => handleInputChange('journal', e.target.value)}
                            placeholder='Ingresar Revista'
                        />
                    </div>
                </div>
                <div className="flex gap-1 sm:gap">
                    <div className='flex-1'>
                        <TextInput
                            inputId='ISSN'
                            label='ISSN'
                            value={newItem.ISSN}
                            onChange={(e) => handleInputChange('ISSN', e.target.value)}
                            placeholder='Ingresar ISSN'
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

export default PublicationForm;
