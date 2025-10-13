import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem, setSelectedRoles } from '../../../../../redux/slice/handleUser/user/userSlice';

// Componentes personalizados
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import DynamicSelect from '../../../../input/dynamicSelect';
import DateInput from '../../../../input/dateInput';
import MultiSelect from '../../../../input/multiSelect';

// Constantes y utilidades
import { validGenders, validMaritalStatuses, validArticulation, roles } from '../../../../../utils/crudHelpers/constants';
import SearchSelect from '../../../../input/searchSelect';

const UserForm = memo(({ updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem, selectedRoles } = useSelector((state) => state.handleUser.user);

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
                { ...newItem, group: parseInt(newItem.group, 10),  articulation: parseInt(newItem.articulation, 10), roleIDs: selectedRoles.map((option) => option.value) }
            );
        }
    };

    const handleInputChange = useCallback((field, value) => {
        dispatch(setNewItem({ [field]: value }));
    }, [dispatch]);

    return (
        <ModalCRUD isOpen={modalOpen}>
            <FormContainer updateId={updateId} itemName={itemName} handleSubmit={handleSubmit} closeModal={closeModal} formHeight='h-96'>
                <TextInput inputId='emailUser' label={'Email*'} value={newItem.email} onChange={(e) => handleInputChange('email', e.target.value)} placeholder={`Ingresar Email`} />
                <TextInput inputId='personalEmail' label={'Email Personal'} value={newItem.personalEmail} onChange={(e) => handleInputChange('personalEmail', e.target.value)} placeholder={`Ingresar Email Personal`} />
                {(!updateId) && (
                    <MultiSelect
                        selectId="roles"
                        placeholder="Seleccione Roles"
                        options={roles}
                        selectedRoles={selectedRoles}
                        setSelectedRoles={(values) => dispatch(setSelectedRoles(values))}
                    />
                )}
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
                    dateFormat="yyyy-MM-dd"
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
                            placeholder={`Ingresar Teléfono Personal`}
                        />
                    </div>
                </div>
            </FormContainer>
        </ModalCRUD >
    );
});

export default UserForm;
