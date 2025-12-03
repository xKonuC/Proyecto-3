import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem, setSelectedRoles } from '../../../../../redux/slice/handleUser/user/userSlice';

// Componentes personalizados
import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';

// Componentes
import ModalCRUD from '../../../../modal/modalCRUD';
import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import MultiSelect from '../../../../input/multiSelect';

// Constantes y utilidades
import { roles } from '../../../../../utils/crudHelpers/constants';

const GraduateForm = memo(({ updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
    const dispatch = useDispatch();
    const { newItem, selectedRoles } = useSelector((state) => state.handleUser.user);

    // Auto-seleccionar el rol "Graduado" cuando se abre el modal para crear
    useEffect(() => {
        if (modalOpen && !updateId) {
            // Preseleccionar el rol "Graduado" (roleID: 5)
            const graduadoRole = roles.find(role => role.value === 5);
            if (graduadoRole) {
                dispatch(setSelectedRoles([graduadoRole]));
            }
        }
    }, [modalOpen, updateId, dispatch]);

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        // Crear copia de los datos
        let cleanedData = { ...newItem };
        
        // Limpiar y validar campos numéricos
        const numericFields = ['group', 'articulation', 'entryYear', 'graduationYear'];
        numericFields.forEach(field => {
            if (cleanedData[field]) {
                const parsed = parseInt(cleanedData[field], 10);
                if (!isNaN(parsed)) {
                    cleanedData[field] = parsed;
                } else {
                    delete cleanedData[field];
                }
            } else {
                delete cleanedData[field];
            }
        });
        
        // Eliminar campos vacíos de strings
        Object.keys(cleanedData).forEach(key => {
            if (cleanedData[key] === '' || cleanedData[key] === null || cleanedData[key] === undefined) {
                delete cleanedData[key];
            }
        });
        
        // Eliminar campos que no deben enviarse
        delete cleanedData.administratorID;
        delete cleanedData.createdAt;
        delete cleanedData.updatedAt;
        
        if (updateId !== null) {
            // Para actualización, usar graduateID
            delete cleanedData.userID;
            delete cleanedData.graduateID;
            
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({ userID: updateId, ...cleanedData });
        } else {
            // Para creación, incluir roleIDs
            const createService = new CreateService(url, itemName, showAlert, responseHandler);
            await createService.execute({
                ...cleanedData,
                roleIDs: selectedRoles.map((option) => option.value)
            });
        }
    };

    const handleInputChange = useCallback((field, value) => {
        dispatch(setNewItem({ [field]: value }));
    }, [dispatch]);

    return (
        <ModalCRUD isOpen={modalOpen}>
            <FormContainer updateId={updateId} itemName={itemName} handleSubmit={handleSubmit} closeModal={closeModal} formHeight='h-96'>
                <TextInput inputId='email' label={'Email*'} value={newItem.email || ''} onChange={(e) => handleInputChange('email', e.target.value)} placeholder={`Ingresar Email`} />
                <TextInput inputId='personalEmail' label={'Email Personal'} value={newItem.personalEmail || ''} onChange={(e) => handleInputChange('personalEmail', e.target.value)} placeholder={`Ingresar Email Personal`} />
                {(!updateId) && (
                    <MultiSelect
                        selectId="roles"
                        placeholder="Seleccione Roles"
                        options={roles}
                        selectedRoles={selectedRoles}
                        setSelectedRoles={(values) => dispatch(setSelectedRoles(values))}
                        isDisabled={true}
                    />
                )}
                <TextInput inputId='rut' label={'Rut*'} value={newItem.rut || ''} onChange={(e) => handleInputChange('rut', e.target.value)} placeholder={`Ingresar Rut`} />
                <div className="flex gap-1 sm:gap-2">
                    <div className='flex-1'>
                        <TextInput inputId='firstName' label={'Primer Nombre*'} value={newItem.firstName || ''} onChange={(e) => handleInputChange('firstName', e.target.value)} placeholder={`Ingresar Primer Nombre`} />
                    </div>
                    <div className='flex-1'>
                        <TextInput inputId='secondName' label={'Segundo Nombre'} value={newItem.secondName || ''} onChange={(e) => handleInputChange('secondName', e.target.value)} placeholder={`Ingresar Segundo Nombre`} />
                    </div>
                </div>
                <div className='flex gap-1 sm:gap-2'>
                    <div className='flex-1'>
                        <TextInput inputId='surname1' label={'Primer Apellido*'} value={newItem.surname1 || ''} onChange={(e) => handleInputChange('surname1', e.target.value)} placeholder={`Ingresar Primer Apellido`} />
                    </div>
                    <div className='flex-1'>
                        <TextInput inputId='surname2' label={'Segundo Apellido'} value={newItem.surname2 || ''} onChange={(e) => handleInputChange('surname2', e.target.value)} placeholder={`Ingresar Segundo Apellido`} />
                    </div>
                </div>
                <TextInput inputId='phone' label={'Teléfono'} value={newItem.phone || ''} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder={`Ingresar Teléfono`} />
                <div className='flex gap-1 sm:gap-2'>
                    <div className='flex-1'>
                        <TextInput inputId='entryYear' label={'Año de Ingreso'} value={newItem.entryYear || ''} onChange={(e) => handleInputChange('entryYear', e.target.value)} placeholder={`Año de Ingreso`} />
                    </div>
                    <div className='flex-1'>
                        <TextInput inputId='group' label={'Grupo'} value={newItem.group || ''} onChange={(e) => handleInputChange('group', e.target.value)} placeholder={`Número de Grupo`} />
                    </div>
                </div>
                <div className='flex gap-1 sm:gap-2'>
                    <div className='flex-1'>
                        <TextInput inputId='graduationYear' label={'Año de Egreso'} value={newItem.graduationYear || ''} onChange={(e) => handleInputChange('graduationYear', e.target.value)} placeholder={`Año de Egreso`} />
                    </div>
                    <div className='flex-1'>
                        <TextInput inputId='workPlace' label={'Lugar de Trabajo'} value={newItem.workPlace || ''} onChange={(e) => handleInputChange('workPlace', e.target.value)} placeholder={`Lugar de Trabajo`} />
                    </div>
                </div>
                <TextInput inputId='job' label={'Cargo'} value={newItem.job || ''} onChange={(e) => handleInputChange('job', e.target.value)} placeholder={`Cargo`} />
            </FormContainer>
        </ModalCRUD>
    );
});

export default GraduateForm;