import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNewItem, setSelectedRoles } from '../../../../../redux/slice/handleUser/user/userSlice';

import UpdateService from '../../../../../utils/crudHelpers/service/baseService/updateService';
import CreateService from '../../../../../utils/crudHelpers/service/baseService/createService';

import ModalCRUD from '../../../../modal/modalCRUD';
import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import MultiSelect from '../../../../input/multiSelect';

import { roles } from '../../../../../utils/crudHelpers/constants';

const MAX_NAME_LENGTH = 20;

/* =========================
   RUT helpers (live format)
========================= */
const cleanRutInput = (v = '') => v.replace(/[^0-9kK]/g, '').toUpperCase();

const formatRutLive = (value = '') => {
  const cleaned = cleanRutInput(value);
  if (!cleaned) return '';

  // si tiene 1 char, es solo cuerpo todavía
  if (cleaned.length === 1) return cleaned;

  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);

  const bodyFmt = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  return `${bodyFmt}-${dv}`;
};

const validateRutFormatOnly = (rut) => {
  if (!rut || typeof rut !== 'string') return 'El RUT es obligatorio.';
  const r = rut.trim();
  const regex = /^(\d{1,3}(?:\.\d{3})*|\d+)-([\dkK])$/;
  if (!regex.test(r)) return 'El RUT debe tener formato válido (ej: 12.345.678-9).';
  return '';
};

/* =========================
   Other validations
========================= */
const validateEmail = (email, fieldName = 'Email') => {
  if (!email) return `${fieldName} es obligatorio.`;
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) return `${fieldName} no tiene un formato válido.`;
  return '';
};

const validateNameLength = (value, fieldName, maxLength = MAX_NAME_LENGTH) => {
  if (!value || !value.trim()) return `${fieldName} es obligatorio.`;
  if (value.length > maxLength) return `${fieldName} no puede exceder los ${maxLength} caracteres.`;
  return '';
};

const validateNumeric = (value, fieldName) => {
  if (!value) return '';
  if (!/^\d+$/.test(String(value))) return `${fieldName} solo debe contener números.`;
  return '';
};

const validateGraduateData = (graduate) => {
  let err = validateRutFormatOnly(graduate.rut);
  if (err) return err;

  err = validateEmail(graduate.email, 'Email institucional');
  if (err) return err;

  err = validateNameLength(graduate.firstName, 'Primer Nombre', MAX_NAME_LENGTH);
  if (err) return err;

  err = validateNameLength(graduate.surname1, 'Primer Apellido', MAX_NAME_LENGTH);
  if (err) return err;

  if (graduate.secondName && graduate.secondName.length > MAX_NAME_LENGTH) return `El Segundo Nombre no puede exceder ${MAX_NAME_LENGTH} caracteres.`;
  if (graduate.surname2 && graduate.surname2.length > MAX_NAME_LENGTH) return `El Segundo Apellido no puede exceder ${MAX_NAME_LENGTH} caracteres.`;

  err = validateNumeric(graduate.phone, 'Teléfono');
  if (err) return err;

  err = validateNumeric(graduate.phoneWork, 'Teléfono Trabajo');
  if (err) return err;

  err = validateNumeric(graduate.entry, 'Año de ingreso');
  if (err) return err;

  err = validateNumeric(graduate.group, 'Grupo');
  if (err) return err;

  err = validateNumeric(graduate.articulation, 'Articulation');
  if (err) return err;

  return '';
};

const GraduateForm = memo(({ updateId, url, itemName, showAlert, modalOpen, closeModal, responseHandler }) => {
  const dispatch = useDispatch();
  const { newItem, selectedRoles } = useSelector((state) => state.handleUser.user);

  useEffect(() => {
    if (modalOpen && !updateId) {
      const graduadoRole = roles.find((r) => r.value === 5);
      if (graduadoRole) dispatch(setSelectedRoles([graduadoRole]));
    }
  }, [modalOpen, updateId, dispatch]);

  const handleInputChange = useCallback(
    (field, value) => {
      let processedValue = value;

      if (field === 'rut') processedValue = formatRutLive(value);

      if (['phone', 'phoneWork', 'entry', 'group', 'articulation'].includes(field)) {
        processedValue = value.replace(/\D/g, '');
      }

      if (['firstName', 'secondName', 'surname1', 'surname2'].includes(field)) {
        if (processedValue.length > MAX_NAME_LENGTH) processedValue = processedValue.slice(0, MAX_NAME_LENGTH);
      }

      dispatch(setNewItem({ [field]: processedValue }));
    },
    [dispatch]
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    const error = validateGraduateData(newItem);
    if (error) {
      showAlert({ type: 'error', content: error });
      return;
    }

    try {
      if (updateId !== null) {
        const updateService = new UpdateService(url, itemName, showAlert, responseHandler);
        await updateService.execute({
          userID: updateId,
          ...newItem,
          group: newItem.group ? parseInt(newItem.group, 10) : null,
          articulation: newItem.articulation ? parseInt(newItem.articulation, 10) : null,
        });
      } else {
        const createService = new CreateService(url, itemName, showAlert, responseHandler);
        await createService.execute({
          ...newItem,
          group: newItem.group ? parseInt(newItem.group, 10) : null,
          articulation: newItem.articulation ? parseInt(newItem.articulation, 10) : null,
          roleIDs: selectedRoles.map((o) => o.value),
        });
      }
    } catch (err) {
      console.error('Error al guardar graduado:', err);
    }
  };

  return (
    <ModalCRUD isOpen={modalOpen}>
      <FormContainer
        updateId={updateId}
        itemName={itemName}
        handleSubmit={handleSubmit}
        closeModal={closeModal}
        formHeight="h-96"
      >
        <TextInput inputId="email" label="Email*" value={newItem.email || ''} onChange={(e) => handleInputChange('email', e.target.value)} placeholder="Ingresar Email" />
        <TextInput inputId="personalEmail" label="Email Personal" value={newItem.personalEmail || ''} onChange={(e) => handleInputChange('personalEmail', e.target.value)} placeholder="Ingresar Email Personal" />

        {!updateId && (
          <MultiSelect
            selectId="roles"
            placeholder="Seleccione Roles"
            options={roles}
            selectedRoles={selectedRoles}
            setSelectedRoles={(values) => dispatch(setSelectedRoles(values))}
            isDisabled={true}
          />
        )}

        <TextInput inputId="rut" label="Rut*" value={newItem.rut || ''} onChange={(e) => handleInputChange('rut', e.target.value)} placeholder="12.345.678-9" />

        <div className="flex gap-1 sm:gap-2">
          <div className="flex-1">
            <TextInput inputId="firstName" label="Primer Nombre*" value={newItem.firstName || ''} onChange={(e) => handleInputChange('firstName', e.target.value)} placeholder="Ingresar Primer Nombre" />
          </div>
          <div className="flex-1">
            <TextInput inputId="secondName" label="Segundo Nombre" value={newItem.secondName || ''} onChange={(e) => handleInputChange('secondName', e.target.value)} placeholder="Ingresar Segundo Nombre" />
          </div>
        </div>

        <div className="flex gap-1 sm:gap-2">
          <div className="flex-1">
            <TextInput inputId="surname1" label="Primer Apellido*" value={newItem.surname1 || ''} onChange={(e) => handleInputChange('surname1', e.target.value)} placeholder="Ingresar Primer Apellido" />
          </div>
          <div className="flex-1">
            <TextInput inputId="surname2" label="Segundo Apellido" value={newItem.surname2 || ''} onChange={(e) => handleInputChange('surname2', e.target.value)} placeholder="Ingresar Segundo Apellido" />
          </div>
        </div>

        <TextInput inputId="sex" label="Sexo (M/F)" value={newItem.sex || ''} onChange={(e) => handleInputChange('sex', e.target.value)} placeholder="M o F" />
        <TextInput inputId="civilStatus" label="Estado Civil" value={newItem.civilStatus || ''} onChange={(e) => handleInputChange('civilStatus', e.target.value)} placeholder="Soltero/a, Casado/a..." />
        <TextInput inputId="birthday" label="Fecha Nacimiento" value={newItem.birthday || ''} onChange={(e) => handleInputChange('birthday', e.target.value)} placeholder="YYYY-MM-DD" />
        <TextInput inputId="address" label="Dirección" value={newItem.address || ''} onChange={(e) => handleInputChange('address', e.target.value)} placeholder="Ingresar dirección" />

        <TextInput inputId="phone" label="Teléfono" value={newItem.phone || ''} onChange={(e) => handleInputChange('phone', e.target.value)} placeholder="Solo números" />
        <TextInput inputId="entry" label="Año de Ingreso" value={newItem.entry || ''} onChange={(e) => handleInputChange('entry', e.target.value)} placeholder="Solo números" />

        <div className="flex gap-1 sm:gap-2">
          <div className="flex-1">
            <TextInput inputId="group" label="Grupo" value={newItem.group || ''} onChange={(e) => handleInputChange('group', e.target.value)} placeholder="Solo números" />
          </div>
          <div className="flex-1">
            <TextInput inputId="articulation" label="Articulation" value={newItem.articulation || ''} onChange={(e) => handleInputChange('articulation', e.target.value)} placeholder="Solo números" />
          </div>
        </div>

        <TextInput inputId="workPlace" label="Lugar de Trabajo" value={newItem.workPlace || ''} onChange={(e) => handleInputChange('workPlace', e.target.value)} placeholder="Empresa / institución" />
        <TextInput inputId="job" label="Cargo" value={newItem.job || ''} onChange={(e) => handleInputChange('job', e.target.value)} placeholder="Cargo" />
        <TextInput inputId="phoneWork" label="Teléfono Trabajo" value={newItem.phoneWork || ''} onChange={(e) => handleInputChange('phoneWork', e.target.value)} placeholder="Solo números" />
      </FormContainer>
    </ModalCRUD>
  );
});

export default GraduateForm;
