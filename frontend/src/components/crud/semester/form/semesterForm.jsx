import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewSemester } from '../../../../redux/slice/semester/semesterSlice';

// Componentes
import ModalCRUD from '../../../modal/modalCRUD';
import CreateService from '../../../../utils/crudHelpers/service/baseService/createService';
import UpdateService from '../../../../utils/crudHelpers/service/baseService/updateService';

import FormContainer from '../../../forms/body/formContainer';
import TextInput from '../../../input/textInput';
import SearchSelect from '../../../input/searchSelect';
import DateInput from '../../../input/dateInput';

// Constantes
import { typeSemester } from '../../../../utils/crudHelpers/constants';

const SemesterForm = memo(({ updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newSemester } = useSelector((state) => state.semester);

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();

        // Restar un día si es una actualización
        let updatedSemester = { ...newSemester };
        if (updateId !== null) {
            const startDate = new Date(updatedSemester.startDate);
            const finishDate = new Date(updatedSemester.finishDate);

            // Restar un día a las fechas
            startDate.setDate(startDate.getDate() - 1);
            finishDate.setDate(finishDate.getDate() - 1);

            // Asignar las fechas ajustadas
            updatedSemester = {
                ...updatedSemester,
                startDate: startDate.toISOString().split('T')[0],
                finishDate: finishDate.toISOString().split('T')[0],
            };

            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ semesterID: updateId, ...updatedSemester });
        } else {
            const createService = new CreateService(url, itemName, showAlert, responseHandler);
            await createService.execute({ ...newSemester });
        }
    };


    const handleInputChange = useCallback((field, value) => {
        const clonedNewItem = { ...newSemester };

        // Convertir el objeto Date a cadena si es necesario
        if (field === 'startDate' || field === 'finishDate') {
            value = value instanceof Date ? value.toISOString() : value;
        }
        clonedNewItem[field] = value;

        dispatch(setNewSemester(clonedNewItem));
    }, [dispatch, newSemester]);

    return (
        <ModalCRUD isOpen={modalOpen}>
            <FormContainer updateId={updateId} itemName={itemName} handleSubmit={handleSubmit} closeModal={closeModal}>
                <TextInput
                    inputId='yearSemester'
                    label={'Año del Semestre*'}
                    value={newSemester.year}
                    onChange={(e) => handleInputChange('year', e.target.value)}
                    placeholder={`Ingresar Año del Semestre`}
                />
                <SearchSelect
                    selectId='semesterNumber'
                    placeholder="Seleccione Tipo de Semestre*"
                    options={typeSemester}
                    value={newSemester.semesterNumber}
                    onChange={(selectedOption) => handleInputChange('semesterNumber', selectedOption.value)}
                />
                <DateInput
                    selectId={'startDate'}
                    placeholderText={'Selecciona una Fecha de Inicio*'}
                    dateFormat="dd/MM/yyyy"
                    showTime={false}
                    value={newSemester.startDate}
                    onChange={(selectedDate) => handleInputChange('startDate', selectedDate)}
                />
                <DateInput
                    selectId={'finishDate'}
                    placeholderText={'Selecciona una Fecha de Finalización*'}
                    dateFormat="dd/MM/yyyy"
                    showTime={false}
                    value={newSemester.finishDate}
                    onChange={(selectedDate) => handleInputChange('finishDate', selectedDate)}
                />
            </FormContainer>
        </ModalCRUD>
    );
});

export default SemesterForm;
