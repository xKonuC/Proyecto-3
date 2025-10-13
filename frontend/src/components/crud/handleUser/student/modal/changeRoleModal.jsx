import React, { useState, useEffect } from 'react';
import ModalCRUD from '../../../../modal/modalCRUD';
import FormContainer from '../../../../forms/body/formContainer';
import TextInput from '../../../../input/textInput';
import SelectInput from '../../../../input/selectInput';
import StyledButton from '../../../../button/styledButton';
import { getAccessToken } from '../../../../../utils/cookieUtils';

const ChangeRoleModal = ({ isOpen, onClose, student, onRoleChange }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchRoles();
    }
  }, [isOpen]);

  const fetchRoles = async () => {
    try {
      const access_token = getAccessToken();
      
      if (!access_token) {
        alert('No hay token de acceso. Por favor, inicia sesión nuevamente.');
        return;
      }

      const url = `${import.meta.env.VITE_MIDDLEWARE_URL_BASE}/role/administrator/graduate/roles`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setRoles(data.data || []);
      } else {
        const errorText = await response.text();
        alert(`Error ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      alert('Error de conexión: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) return;

    setLoading(true);
    try {
      const access_token = getAccessToken();
      if (!access_token) {
        alert('No hay token de acceso disponible');
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_MIDDLEWARE_URL_BASE}/role/administrator/graduate/roles/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userID: student.userID,
          newRoleID: parseInt(selectedRole)
        })
      });

      if (response.ok) {
        const data = await response.json();
        onRoleChange(data);
        onClose();
      } else {
        const error = await response.json();
        alert('Error: ' + error.message);
      }
    } catch (error) {
      alert('Error al actualizar el rol');
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = roles.map(role => ({
    value: role.roleID,
    label: role.name
  }));

  return (
    <ModalCRUD isOpen={isOpen}>
      <FormContainer 
        updateId={null} 
        itemName="Rol" 
        handleSubmit={handleSubmit} 
        closeModal={onClose} 
        formHeight="h-64"
      >
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Cambiar Rol de Estudiante
          </h3>
          <p className="text-sm text-gray-600">
            <strong>Estudiante:</strong> {student?.fullName || `${student?.firstName} ${student?.surname1}`}
          </p>
          <p className="text-sm text-gray-600">
            <strong>RUT:</strong> {student?.rut}
          </p>
        </div>

        <SelectInput
          inputId="role"
          label="Nuevo Rol"
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          options={roleOptions}
          placeholder="Selecciona un rol"
        />

        <div className="flex gap-2 mt-4">
          <StyledButton
            type="submit"
            disabled={loading || !selectedRole}
            className="flex-1"
          >
            {loading ? 'Actualizando...' : 'Cambiar Rol'}
          </StyledButton>
          <StyledButton
            type="button"
            onClick={onClose}
            className="flex-1 bg-gray-500 hover:bg-gray-600"
          >
            Cancelar
          </StyledButton>
        </div>
      </FormContainer>
    </ModalCRUD>
  );
};

export default ChangeRoleModal;
