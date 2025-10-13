import React, { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleAcademicRecord/bookChapter/bookChapterSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import DynamicSelect from '../../../../input/dynamicSelect';

// Constantes
import { validBookChapterType, validStatus } from '../../../../../utils/crudHelpers/constants';

const BookChapterForm = memo(({ updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleAcademicRecord.bookChapter);
    const { userID } = useParams();

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ bookChapterID: updateId, ...newItem, userID });
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
                            selectId='type'
                            label="Seleccione Tipo"
                            options={validBookChapterType}
                            value={newItem.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                        />
                    </div>
                </div>
                {(newItem.type === 'Libro' || newItem.type === 'Capitulo de Libro') &&
                    <div className='flex-1'>
                        <TextInput
                            inputId='bookName'
                            label='Nombre del Libro'
                            value={newItem.bookName}
                            onChange={(e) => handleInputChange('bookName', e.target.value)}
                            placeholder='Ingresar Nombre del Libro'
                        />
                    </div>
                }
                {newItem.type === 'Capitulo de Libro' &&
                    <div className='flex-1'>
                        <TextInput
                            inputId='chapterName'
                            label='Nombre del Capítulo'
                            value={newItem.chapterName}
                            onChange={(e) => handleInputChange('chapterName', e.target.value)}
                            placeholder='Ingresar Nombre del Capítulo'
                        />
                    </div>
                }
                <div className="flex gap-1 sm:gap">
                    <div className='flex-1'>
                        <TextInput
                            inputId='place'
                            label='Lugar'
                            value={newItem.place}
                            onChange={(e) => handleInputChange('place', e.target.value)}
                            placeholder='Ingresar Lugar'
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
                    inputId='editorial'
                    label='Editorial'
                    value={newItem.editorial}
                    onChange={(e) => handleInputChange('editorial', e.target.value)}
                    placeholder='Ingresar Editorial'
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

export default BookChapterForm;
