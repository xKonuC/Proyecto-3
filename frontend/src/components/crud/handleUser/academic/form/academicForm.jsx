import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem } from '../../../../../redux/slice/handleUser/academic/academicSlice';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';

import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import DynamicSelect from '../../../../input/dynamicSelect';
import DateInput from '../../../../input/dateInput';

// Constantes
import { validGenders, validMaritalStatuses } from '../../../../../utils/crudHelpers/constants';
import SearchSelect from '../../../../input/searchSelect';

const AcademicForm = memo(({ updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
  const dispatch = useDispatch();
  const { newItem } = useSelector((state) => state.handleUser.academic);

  // Función para manejar el envío de datos (submit)
  const handleSubmit = async (event) => {
    event.preventDefault();
    // Restar un día si es una actualización
    let updatedItem = { ...newItem };
    if (updateId !== null) {
      const birthday = new Date(updatedItem.birthday);

      // Restar un día a las fechas
      birthday.setDate(birthday.getDate() - 1);

      // Asignar las fechas ajustadas
      updatedItem = {
        ...updatedItem,
        birthday: birthday.toISOString().split('T')[0],
      };

      const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
      await updateService.execute({ userID: updateId, group: parseInt(newItem.group, 10), articulation: parseInt(newItem.articulation, 10), ...updatedItem });
    } else {
      const createService = new CreateService(url, itemName, showAlert, responseHandler);
      await createService.execute(
        { ...newItem, articulation: parseInt(newItem.articulation, 10), roleIDs: [3] }
      );
    }
  };

  const handleInputChange = useCallback((field, value) => {
    dispatch(setNewItem({ [field]: value }));
  }, [dispatch]);

  return (
    <ModalCRUD isOpen={modalOpen}>
      <FormContainer
        updateId={updateId}
        itemName={itemName}
        pText={''}
        handleSubmit={handleSubmit}
        closeModal={closeModal}
      >
        <TextInput inputId='emailUser' label={'Email*'} value={newItem.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder={`Ingresar Email`} />
        <TextInput inputId='personalEmail' label={'Email Personal'} value={newItem.personalEmail} onChange={(e) => handleInputChange('personalEmail', e.target.value)} placeholder={`Ingresar Email Personal`} />
        <TextInput inputId='rut' label={'Rut*'} value={newItem.rut} onChange={(e) => handleInputChange('rut', e.target.value)} placeholder={`Ingresar Rut`} />
        <div className="flex gap-1 sm:gap">
          <div className='flex-1'>
            <TextInput inputId='firstName' label={'Primer Nombre*'} value={newItem.firstName} onChange={(e) => handleInputChange('firstName', e.target.value)} placeholder={`Ingresar Primer Nombre`} />
          </div>
          <div className='flex-1'>
            <TextInput inputId='secondName' label={'Segundo Nombre'} value={newItem.secondName} onChange={(e) => handleInputChange('secondName', e.target.value)} placeholder={`Ingresar Segundo Nombre`} />
          </div>
        </div>
        <div className='flex gap-1 sm:gap-2'>
          <div className='flex-1'>
            <TextInput inputId='surname1' label={'Primer Apellido*'} value={newItem.surname1} onChange={(e) => handleInputChange('surname1', e.target.value)} placeholder={`Ingresar Primer Apellido`} />
          </div>
          <div className='flex-1'>
            <TextInput inputId='surname2' label={'Segundo Apellido'} value={newItem.surname2} onChange={(e) => handleInputChange('surname2', e.target.value)} placeholder={`Ingresar Segundo Apellido`} />
          </div>
        </div>
        <div className='flex gap-1 sm:gap-2'>
          <div className='flex-1'>
            <SearchSelect
              selectId='sex'
              placeholder="Seleccione Sexo*"
              options={validGenders}
              value={newItem.sex}
              onChange={(selectedOption) => handleInputChange('sex', selectedOption.value)}
            />
          </div>
          <div className='flex-1'>
            <DynamicSelect selectId='civilStatus' label="Seleccione Estado Civil" options={validMaritalStatuses} value={newItem.civilStatus} onChange={(e) => handleInputChange('civilStatus', e.target.value)} />
          </div>
        </div>
        <DateInput
          selectId="birthday"
          placeholderText="Ingresar Fecha de Nacimiento*"
          dateFormat="dd/MM/yyyy"
          showTime={false}
          value={newItem.birthday}
          onChange={(date) => handleInputChange('birthday', date)}
        />
        <div className='flex gap-1 sm:gap-2'>
          <div className='flex-1'>
            <TextInput
              inputId='address'
              label={'Dirección'}
              value={newItem.address}
              onChange={(e) => handleInputChange('address', e.target.value)}
              placeholder={`Ingresar Dirección`}
            />
          </div>
          <div className='flex-1'>
            <TextInput
              label={'Teléfono (9XXXXXXXX)'}
              inputId='phone'
              value={newItem.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              placeholder={`Ingresar Teléfono`}
            />
          </div>
        </div>
      </FormContainer>
    </ModalCRUD >
  );
});

export default AcademicForm;
