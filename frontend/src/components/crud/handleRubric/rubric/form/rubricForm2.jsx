import React, { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Componentes
import { setNewItem } from '../../../../../redux/slice/handleRubric/rubric/rubricSlice';
import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import TextArea from '../../../../input/textArea';
import ModalCRUD from '../../../../modal/modalCRUD';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';
import SearchSelect from '../../../../input/searchSelect';

const RubricForm = memo(({ template, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleRubric.rubric);
    const { evaluationTypeID } = useParams();
    const parsedEvaluationTypeID = parseInt(evaluationTypeID, 10);

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newItem.rubricID !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ ...newItem, isUpdateTemplateID: newItem.templateID !== newItem.previousTemplateID ? true : false });
        } else {
            const createService = new CreateService(url, itemName, showAlert, responseHandler);

            await createService.execute(
                { ...newItem }
            );
        }
    };

    const handleInputChange = useCallback((field, value) => {
        dispatch(setNewItem({ [field]: value }));
    }, [dispatch]);

    return (
        <ModalCRUD isOpen={modalOpen}>
            <FormContainer
                createMessage={`Asignar Rúbrica`}
                create2Message={`Asignación de Rúbrica`}
                updateMessage={`Actualizar Rúbrica`}
                update2Message={`Actualización de Rúbrica`}
                updateId={newItem.rubricID}
                itemName={itemName}
                handleSubmit={handleSubmit}
                closeModal={closeModal}
            >
                <TextInput
                    inputId='name'
                    label={'Título de Anteproyecto o Tesis*'}
                    value={newItem.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    placeholder={`Ingresar Título de Anteproyecto o Tesis del estudiante`}
                />
                <TextArea
                    inputId='description'
                    label={'Notas Adicionales'}
                    value={newItem.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder={`Ingresar Notas Adicionales para el académico`}
                />
                <SearchSelect
                    options={template}
                    value={newItem.templateID}
                    onChange={(selectedOption) => handleInputChange('templateID', selectedOption.value)}
                    placeholder="Selecciona un Plantilla"
                    selectId="templateID"
                />
                {parsedEvaluationTypeID === 1 && (
                    <div className="flex gap-4">
                        <div className={`w-full text-center`}>
                            <p className='block text-sm sm:text-base px-2 py-1 font-bold rounded bg-orange-main text-white'>
                                Estado Actual del Anteproyecto: {newItem.preproject_status}
                            </p>
                        </div>
                    </div>
                )}
            </FormContainer>
        </ModalCRUD>
    );
});

export default RubricForm;
