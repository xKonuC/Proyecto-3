import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleSpecialization/administrative/evaluationStatusSlice';

// Componentes
import FormContainerNotUpdate from '../../../../forms/body/formContainerNotUpdate';
import SearchSelect from '../../../../input/searchSelect';
import ModalCRUD from '../../../../modal/modalCRUD';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

// Estilos
import EditIcon from '../../../../icon/crud/editIcon';

const EvaluationStatusForm = memo(({ evaluationStatus, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {

    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleSpecialization.administrative.evaluationStatus);

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
        await updateService.execute({ ...newItem });
    };

    const handleInputChange = useCallback((field, value) => {
        dispatch(setNewItem({ [field]: value }));
    }, [dispatch]);

    return (
        <ModalCRUD isOpen={modalOpen}>
            <FormContainerNotUpdate
                message={'Modificar Estado de Evaluación'}
                secondaryMessage={''}
                messageButton={'Modificar Estado'}
                handleSubmit={handleSubmit}
                closeModal={closeModal}
                customPath={<EditIcon />}
            >
                <SearchSelect
                    selectId='evaluationStatusID'
                    placeholder="Seleccionar un Estado de la Evaluación"
                    options={evaluationStatus}
                    value={newItem.evaluationStatusID}
                    onChange={(selectedOption) => handleInputChange('evaluationStatusID', selectedOption.value)}
                />
            </FormContainerNotUpdate>
        </ModalCRUD>
    );
});

export default EvaluationStatusForm;
