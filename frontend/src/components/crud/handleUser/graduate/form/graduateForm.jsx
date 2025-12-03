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

const MAX_NAME_LENGTH = 20;

// VALIDACION DE RUT
const validateRut = (rut) => {
  if (!rut || typeof rut !== 'string') {
    return 'El RUT es obligatorio.';
  }

  /*const cleanRut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

  if (!/^[0-9]+[0-9K]$/.test(cleanRut)) {
    return 'El RUT debe tener un formato válido (ej: 12.345.678-9).';
  }

  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);

  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const expectedDigit = 11 - (sum % 11);
  let dvCalc;

  if (expectedDigit === 11) dvCalc = '0';
  else if (expectedDigit === 10) dvCalc = 'K';
  else dvCalc = String(expectedDigit);

  if (dvCalc !== dv) {
    return 'El RUT ingresado no es válido.';
  }*/

  const cleanRut = rut.trim();

  const regex = /^(\d{1,3}(?:\.\d{3})*|\d+)-([\dkK])$/;
  if (!regex.test(cleanRut)) {
    return 'El RUT debe tener un formato válido (ej: 12.345.678-9).';
  }

  return '';
};

// VALIDAR FORMATO EMAIL
const validateEmail = (email, fieldName = 'Email') => {
  if (!email) {
    return `${fieldName} es obligatorio.`;
  }

  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return `${fieldName} no tiene un formato válido.`;
  }

  return '';
};

// TEXTO MAXIMO PARA NOMBRES
const validateNameLength = (value, fieldName, maxLength = MAX_NAME_LENGTH) => {
  if (!value || !value.trim()) {
    return `${fieldName} es obligatorio.`;
  }

  if (value.length > maxLength) {
    return `${fieldName} no puede exceder los ${maxLength} caracteres.`;
  }

  return '';
};

// VALIDACION PARA SOLO NUMEROS
const validateNumericField = (value, fieldName) => {
  if (!value) {
    return `${fieldName} es obligatorio.`;
  }

  if (!/^\d+$/.test(String(value))) {
    return `${fieldName} solo debe contener números.`;
  }

  return '';
};

// VALIDACIONES PARA EL FORMULARIO
const validateGraduateData = (graduate) => {
  // RUT
  let error = validateRut(graduate.rut);
  if (error) return error;

  // Email institucional
  error = validateEmail(graduate.email, 'Email institucional');
  if (error) return error;

  // Nombres / apellidos obligatorios
  error = validateNameLength(graduate.firstName, 'Primer Nombre', MAX_NAME_LENGTH);
  if (error) return error;

  error = validateNameLength(graduate.surname1, 'Primer Apellido', MAX_NAME_LENGTH);
  if (error) return error;

  // Segundo nombre y segundo apellido: solo limitar si existen
  if (graduate.secondName && graduate.secondName.length > MAX_NAME_LENGTH) {
    return 'El Segundo Nombre no puede exceder los 50 caracteres.';
  }

  if (graduate.surname2 && graduate.surname2.length > MAX_NAME_LENGTH) {
    return 'El Segundo Apellido no puede exceder los 50 caracteres.';
  }

  // Teléfono (si se ingresa, solo números)
  if (graduate.phone) {
    error = validateNumericField(graduate.phone, 'Teléfono');
    if (error) return error;
  }

  // Año de ingreso (si se ingresa, solo números)
  if (graduate.entry) {
    error = validateNumericField(graduate.entry, 'Año de ingreso');
    if (error) return error;
  }

  return '';
};

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

    const handleInputChange = useCallback(
        (field, value) => {
        let processedValue = value;

        // Teléfono solo números
        if (field === 'phone') {
            processedValue = value.replace(/\D/g, '');
        }

        // Año de ingreso solo números
        if (field === 'entry') {
            processedValue = value.replace(/\D/g, '');
        }

        // Limitar longitud de nombres y apellidos
        if (['firstName', 'secondName', 'surname1', 'surname2'].includes(field)) {
            if (processedValue.length > MAX_NAME_LENGTH) {
            processedValue = processedValue.slice(0, MAX_NAME_LENGTH);
            }
        }

        dispatch(setNewItem({ [field]: processedValue }));
        },
        [dispatch],
    );

    // Función para manejar el envío de datos (submit)
    const handleSubmit = async (event) => {
        event.preventDefault();
        const error = validateGraduateData(newItem);
        if (error) {
        showAlert({
            type: 'error',
            content: error,
        });
        return;
        }

        let updatedItem = { ...newItem };

        try {
        if (updateId !== null) {
            const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
            await updateService.execute({
            userID: updateId,
            group: parseInt(newItem.group, 10),
            articulation: parseInt(newItem.articulation, 10),
            ...updatedItem,
            });
        } else {
            const createService = new CreateService(url, itemName, showAlert, responseHandler);
            await createService.execute({
            ...newItem,
            group: parseInt(newItem.group, 10),
            articulation: parseInt(newItem.articulation, 10),
            roleIDs: selectedRoles.map((option) => option.value),
            });
        }
        } catch (err) {
        console.error('Error al guardar graduado:', err);
        }
    };

    /*const handleInputChange = useCallback((field, value) => {
        dispatch(setNewItem({ [field]: value }));
    }, [dispatch]);*/

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
                        <TextInput inputId='entry' label={'Año de Ingreso'} value={newItem.entry || ''} onChange={(e) => handleInputChange('entry', e.target.value)} placeholder={`Año de Ingreso`} />
                    </div>
                    <div className='flex-1'>
                        <TextInput inputId='group' label={'Grupo'} value={newItem.group || ''} onChange={(e) => handleInputChange('group', e.target.value)} placeholder={`Número de Grupo`} />
                    </div>
                </div>
            </FormContainer> 
        </ModalCRUD>
    );
});

export default GraduateForm;
