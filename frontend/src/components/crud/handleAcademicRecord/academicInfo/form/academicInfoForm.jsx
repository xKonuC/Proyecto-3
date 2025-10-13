import React, { memo, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleAcademicRecord/academicInfo/academicInfoSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';

import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import DynamicSelect from '../../../../input/dynamicSelect';
import SearchSelect from '../../../../input/searchSelect';

// Constantes
import { validHierarchy, validTypeBond, validWorkedHours } from '../../../../../utils/crudHelpers/constants';

const AcademicInfoForm = memo(({ selectAcademicHasTitle, updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem } = useSelector((state) => state.handleAcademicRecord.academicInfo);
    const { userID } = useParams();

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ ...newItem, userID });
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
                    inputId='investigationLines'
                    label='Línea(s) de Investigación'
                    value={newItem.investigationLines}
                    onChange={(e) => handleInputChange('investigationLines', e.target.value)}
                    placeholder='Ingresar Línea(s) de Investigación'
                />
                <DynamicSelect
                    selectId='workedHours'
                    label="Seleccione Dedicación a Institución*"
                    options={validWorkedHours}
                    value={newItem.workedHours}
                    onChange={(e) => handleInputChange('workedHours', e.target.value)}
                />
                <div className="flex gap-1 sm:gap">
                    <div className='flex-1'>
                        <DynamicSelect
                            selectId='bondType'
                            label="Seleccione Tipo de Vínculo*"
                            options={validTypeBond}
                            value={newItem.bondType}
                            onChange={(e) => handleInputChange('bondType', e.target.value)}
                        />
                    </div>
                    <div className='flex-1'>
                        <DynamicSelect
                            selectId='hierarchy'
                            label="Seleccione Jerarquía"
                            options={validHierarchy}
                            value={newItem.hierarchy}
                            onChange={(e) => handleInputChange('hierarchy', e.target.value)}
                        />
                    </div>
                </div>
                <SearchSelect
                    selectId='bestDegreeID'
                    placeholder="Seleccione Mejor Titulación*"
                    options={selectAcademicHasTitle}
                    value={newItem.bestDegreeID}
                    onChange={(selectedOption) => handleInputChange('bestDegreeID', selectedOption.value)}
                />
            </FormContainer>
        </ModalCRUD>
    );
});

export default AcademicInfoForm;
