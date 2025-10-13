import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

// Componentes
import ModalCRUD from '../../../../../modal/modalCRUD';
import CreateFileService from '../../../../../../utils/crudHelpers/service/fileService/createFileService';
import UpdateFileService from '../../../../../../utils/crudHelpers/service/fileService/updateFileService';

import FormContainer from '../../../../../forms/body/formContainer';
import FileDropzone from '../../../../../input/fileDropzone';
import { useSelector } from 'react-redux';

const EvaluateForm = memo(({ selectedFile, url, updateId, itemName, setSelectedFile, showAlert, modalOpen, closeModal, responseHandler }) => {

    const { evaluationTypeID, studentHasSemesterID } = useParams();
    const { newEvaluate } = useSelector((state) => state.handleSpecialization.student.evaluate);

    const handleFileChange = async (file) => {
        if (file.type !== 'application/pdf') {
            showAlert({
                type: 'error',
                content: 'El archivo debe ser un PDF',
            });
            return;
        }
    
        setSelectedFile(file);
        showAlert({
            type: 'verification',
            content: 'Se ha cargado el archivo',
        });
    };
    
    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateFileService(url, itemName, showAlert, responseHandler);
            await updateService.execute({
                evaluationID: updateId,
                studentHasSemesterID: parseInt(studentHasSemesterID, 10),
                evaluationTypeID: parseInt(evaluationTypeID, 10),
                ...newEvaluate
            }, selectedFile);
        } else {
            const createService = new CreateFileService(url, itemName, showAlert, responseHandler);
            await createService.execute(
                {
                    studentHasSemesterID: parseInt(studentHasSemesterID, 10),
                    evaluationTypeID: parseInt(evaluationTypeID, 10),
                }, selectedFile
            );
        }
    };
    return (
        <ModalCRUD isOpen={modalOpen}>
            <FormContainer
                updateId={updateId}
                itemName={`${evaluationTypeID === '1' ? 'Anteproyecto' : 'Tesis'}`}
                pText={''}
                handleSubmit={handleSubmit}
                closeModal={closeModal}
                createMessage={`${evaluationTypeID === '1' ? 'Subir Anteproyecto' : 'Subir Tesis'}`}
                create2Message={'Proceso de Evaluación'}
                updateMessage={`${evaluationTypeID === '1' ? 'Modificar Anteproyecto' : 'Modificar Tesis'}`}
                update2Message={'Proceso de Evaluación'}
            >
                <FileDropzone onFileChange={handleFileChange} allowedFileTypes={['.pdf']}/>
            </FormContainer>
        </ModalCRUD>
    );
});

export default EvaluateForm;
