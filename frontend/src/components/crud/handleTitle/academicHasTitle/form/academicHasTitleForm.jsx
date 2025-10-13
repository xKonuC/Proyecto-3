import React, { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleTitle/academicHasTitle/academicHasTitleSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import UpdateFileService from '../../../../../utils/crudHelpers/service/fileService/updateFileService';
import CreateFileService from '../../../../../utils/crudHelpers/service/fileService/createFileService';

import FormContainer from '../../../../forms/body/formContainer';
import SearchSelect from '../../../../input/searchSelect';
import TextInput from '../../../../input/textInput';
import FileDropzone from '../../../../input/fileDropzone';

const AcademicHasTitleForm = memo(({ selectTitle, selectedFile, url, updateId, itemName, setSelectedFile, showAlert, modalOpen, closeModal, responseHandler }) => {
    const { userID } = useParams();

    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleTitle.academicHasTitle);

    const handleFileChange = async (file) => {
        setSelectedFile(file);
        showAlert({
            type: 'verification',
            content: 'Se ha Cargado el Archivo',
        });
    };

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateFileService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ academicHasTitleID: updateId, ...newItem, userID }, selectedFile);
        } else {
            const createService = new CreateFileService(url, itemName, showAlert, responseHandler);
            await createService.execute(
                { ...newItem, userID }, selectedFile
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
                    inputId='titleYear'
                    label={'Año de Obtención del Título*'}
                    value={newItem.titleYear}
                    onChange={(e) => handleInputChange('titleYear', e.target.value)}
                    placeholder={`Ingresar Año de Obtención del Título`}
                />
                <SearchSelect
                    selectId='titleID'
                    placeholder="Seleccione un Título*"
                    options={selectTitle}
                    value={newItem.titleID}
                    onChange={(selectedOption) => handleInputChange('titleID', selectedOption.value)}
                />
                <FileDropzone onFileChange={handleFileChange} />
            </FormContainer>
        </ModalCRUD>
    );
});

export default AcademicHasTitleForm;
