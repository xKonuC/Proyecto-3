import React, { useState, useEffect } from 'react';
import ModalCRUD from '../../../../modal/modalCRUD';
import SelectInput from '../../../../input/selectInput';
import StyledButton from '../../../../button/styledButton';
import HandleAlert from '../../../../alert/handleAlert';
import { getAccessToken } from '../../../../../utils/cookieUtils';

const ChangeRoleModal = ({ isOpen, onClose, student, onRoleChange }) => {
  const [roles, setRoles] = useState([]);
  const [selectedRole, setSelectedRole] = useState('');
  const [loading, setLoading] = useState(false);
  const [alertComponent, showAlert] = HandleAlert();

  useEffect(() => {
    if (isOpen) {
      fetchRoles();
    }
  }, [isOpen]);

  const fetchRoles = async () => {
    try {
      // Solo permitir roles Estudiante (4) y Graduado (5)
      const allowedRoles = [
        { roleID: 4, name: 'Estudiante' },
        { roleID: 5, name: 'Graduado' }
      ];

      // Para estudiantes, siempre mostrar ambos roles (Estudiante y Graduado)
      // El backend se encarga de eliminar el rol actual y asignar el nuevo
      setRoles(allowedRoles);
    } catch (error) {
      showAlert({
        type: 'error',
        content: 'Error de conexión: ' + error.message
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedRole) return;

    setLoading(true);
    try {
      const access_token = getAccessToken();
      if (!access_token) {
        showAlert({
          type: 'error',
          content: 'No hay token de acceso disponible'
        });
        return;
      }

      const url = `${import.meta.env.VITE_MIDDLEWARE_URL_BASE}/role/administrator/graduate/roles/update`;
      const body = {
        userID: student.userID,
        newRoleID: parseInt(selectedRole)
      };
      
      // console.log('=== Frontend Debug ===');
      // console.log('Student object:', student);
      // console.log('URL:', url);
      // console.log('Body:', body);
      // console.log('Access Token:', access_token);
      // console.log('Access Token length:', access_token ? access_token.length : 'null');
      // console.log('Access Token type:', typeof access_token);
      
      // console.log('=== Making fetch request ===');
      // console.log('URL:', url);
      // console.log('Method: PUT');
      // console.log('Headers:', {
      //   'Authorization': `Bearer ${access_token}`,
      //   'Content-Type': 'application/json'
      // });
      // console.log('Body:', JSON.stringify(body));
      
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${access_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      
      // console.log('=== Fetch completed ===');
      // console.log('Response received:', response);
      // console.log('Response status:', response.status);
      // console.log('Response ok:', response.ok);

      // console.log('=== Response Status ===');
      // console.log('Status:', response.status);
      // console.log('Status Text:', response.statusText);
      // console.log('OK:', response.ok);

      if (response.ok) {
        const data = await response.json();
        // console.log('Role change response:', data);
        showAlert({
          type: 'success',
          content: data.message || 'Rol actualizado exitosamente'
        });
        onRoleChange(data);
        onClose();
      } else {
        console.log('=== Error Response ===');
        const error = await response.json();
        console.log('Error data:', error);
        
        // Si el token es inválido, redirigir al login
        if (error.expirationError || response.status === 401) {
          showAlert({
            type: 'error',
            content: 'Tu sesión ha expirado. Por favor, inicia sesión nuevamente.'
          });
          // Redirigir al login después de 2 segundos
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          showAlert({
            type: 'error',
            content: error.message || 'Error al actualizar el rol'
          });
        }
      }
    } catch (error) {
      console.log('=== Fetch Error ===');
      console.log('Error:', error);
      console.log('Error message:', error.message);
      console.log('Error stack:', error.stack);
      showAlert({
        type: 'error',
        content: 'Error al actualizar el rol: ' + error.message
      });
    } finally {
      setLoading(false);
    }
  };

  const roleOptions = roles.map(role => ({
    value: role.roleID,
    label: role.name
  }));

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}
      
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
    </>
  );
};

export default ChangeRoleModal;
