import React, { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../redux/slice/document/documentSlice';

// Componentes
import ModalCRUD from '../../../modal/modalCRUD';
import UpdateService from '../../../../utils/crudHelpers/service/baseService/updateService';
import CreateFileService from '../../../../utils/crudHelpers/service/fileService/createFileService';

import FormContainer from '../../../forms/body/formContainer';
import FileDropzone from '../../../input/fileDropzone';
import DynamicSelect from '../../../input/dynamicSelect';

// Constantes
import { validCategory } from '../../../../utils/crudHelpers/constants';

const DocumentForm = memo(({ selectedFile, url, updateId, itemName, setSelectedFile, showAlert, modalOpen, closeModal, responseHandler }) => {
    const { userID } = useParams();

    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.document);

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
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ documentID: updateId, ...newItem });
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
            <FormContainer updateId={updateId} createMessage={'Crear Documento'} create2Message={'Crear Documento'} updateMessage={'Modificar Categoría'} update2Message={'Modificar Categoría'} itemName={itemName} handleSubmit={handleSubmit} closeModal={closeModal}>
                <DynamicSelect selectId='documentCategory' label="Seleccione una Categoría*" options={validCategory} value={newItem.category} onChange={(e) => handleInputChange('category', e.target.value)} />
                {(!updateId) && (
                    <FileDropzone onFileChange={handleFileChange} />
                )}
            </FormContainer>
        </ModalCRUD>
    );
});

export default DocumentForm;
