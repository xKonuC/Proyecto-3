import React, { useState, useEffect } from 'react';
import ModalCRUD from '../../../../modal/modalCRUD';
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
      // Solo permitir roles Estudiante (4) y Egresado (5)
      const allowedRoles = [
        { roleID: 4, name: 'Estudiante' },
        { roleID: 5, name: 'Egresado' }
      ];
      setRoles(allowedRoles);
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
      <div className="bg-white w-10/12 sm:w-7/12 md:w-6/12 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-2 p-3 sm:p-6">
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
        </form>
      </div>
    </ModalCRUD>
  );
};

export default ChangeRoleModal;
