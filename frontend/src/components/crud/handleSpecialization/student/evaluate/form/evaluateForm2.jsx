import React, { memo } from 'react';
import { useParams } from 'react-router-dom';

// Componentes
import CreateFileService from '../../../../../../utils/crudHelpers/service/fileService/createFileService';

import FileDropzone from '../../../../../input/fileDropzone';
import StyledButton from '../../../../../button/styledButton';
import CreateIcon from '../../../../../icon/crud/createIcon';

const EvaluateForm = memo(({ selectedFile, url, itemName, setSelectedFile, showAlert, responseHandler }) => {

    const { evaluationTypeID, studentHasSemesterID } = useParams();

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
        const createService = new CreateFileService(url, itemName, showAlert, responseHandler);
        await createService.execute(
            {
                studentHasSemesterID: parseInt(studentHasSemesterID, 10),
                evaluationTypeID: parseInt(evaluationTypeID, 10),
            }, selectedFile
        );
    };

    return (
        <div className="w-full items-center space-y-2 mt-4 h-48 md:h-72 lg:h-80">
            <FileDropzone onFileChange={handleFileChange} allowedFileTypes={['.pdf']} />
            <div className="col-span-full sm:col-span-1">
                <StyledButton
                    onClick={handleSubmit}
                    type="submit"
                >
                    <CreateIcon />
                    {parseInt(evaluationTypeID, 10) === 1 ? 'Subir Anteproyecto' : 'Subir Tesis'}
                </StyledButton>
            </div>
        </div>
    );
});

export default EvaluateForm;
