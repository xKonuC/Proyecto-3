import React, { useState, useEffect } from 'react';
import '../../style/rainbow.css';
import PasswordCRUD from '../crud/profile/password/passwordCRUD';
import { format } from 'date-fns';

// 🔑 Token desde cookies (NO localStorage)
import { getAccessToken } from '../../utils/cookieUtils';
// si VSCode marca error, usa:
// import { getAccessToken } from '../../../utils/cookieUtils';

const getFormattedRoles = (roles) => {
  if (roles && typeof roles === 'string') {
    return roles.split(';').map((role) => role.trim());
  }
  return [];
};

const options = [
  { label: 'RUT', value: 'rut' },
  { label: 'Sexo', value: 'sex' },
  { label: 'Estado Civil', value: 'civilStatus' },
  { label: 'Fecha de Nacimiento', value: 'birthday' },
  { label: 'Dirección', value: 'address' },
  { label: 'Lugar de Trabajo', value: 'workPlace' },
  { label: 'Número de Teléfono', value: 'phone' },
  { label: 'Teléfono de Trabajo', value: 'phoneWork' },
  { label: 'Ocupación', value: 'job' },
  { label: 'Articulación', value: 'articulation' },
];

const ProfileCard = ({ item }) => {
  const [editando, setEditando] = useState(false);
  const [formData, setFormData] = useState({ ...item });

  // 🔄 sincroniza datos si el perfil cambia
  useEffect(() => {
    setFormData(item);
  }, [item]);

  const handleChange = (e, field) => {
    setFormData({
      ...formData,
      [field]: e.target.value,
    });
  };

  const guardarCambios = async () => {
    try {
      const token = getAccessToken();

      if (!token) {
        alert('No estás autenticado');
        return;
      }

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/profile`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      // 🛡️ evita error JSON vacío
      const text = await response.text();
      const data = text ? JSON.parse(text) : {};

      if (!response.ok) {
        throw new Error(data.message || 'Error al actualizar perfil');
      }

      alert('Perfil actualizado correctamente');
      setEditando(false);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  return (
    <div className="w-5/6 md:w-4/6 relative overflow-visible rounded-xl border bg-white shadow border-gray-100 p-4 sm:p-6 lg:p-8">
      {/* Rainbow */}
      <span className="absolute inset-x-0 bottom-0 h-3">
        <div className="h-full w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-300 animate-rainbow"></div>
      </span>

      {/* Header */}
      <div className="flex justify-center">
        <div className="grid grid-cols-2 items-center justify-center space-y-4 sm:space-y-0">
          <div className="col-span-full sm:col-span-1 text-center sm:text-start">
            <h3 className="text-lg font-bold text-gray-900 sm:text-2xl">
              {item.firstName} {item.secondName} {item.surname1} {item.surname2}
            </h3>
            <p className="text-xs font-medium text-gray-600">
              {item.email}
            </p>
          </div>

          <div className="col-span-full sm:col-span-1 text-xs sm:text-sm">
            {getFormattedRoles(item.roles).map((role, index) => (
              <span
                key={index}
                className="mr-1 px-2.5 py-1 rounded bg-sky-200 text-sky-800"
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {options.map((option) => (
          <div key={option.value} className="flex flex-col">
            <dt className="text-sm font-medium text-gray-600">
              {option.label}
            </dt>
            <dd className="text-xs mt-0.5 text-gray-500">
              {editando ? (
                option.value === 'birthday' ? (
                  <input
                    type="date"
                    value={
                      formData.birthday
                        ? format(new Date(formData.birthday), 'yyyy-MM-dd')
                        : ''
                    }
                    onChange={(e) => handleChange(e, 'birthday')}
                    className="w-full rounded border px-2 py-1 text-xs"
                  />
                ) : option.value === 'articulation' ? (
                  <select
                    value={formData.articulation}
                    onChange={(e) => handleChange(e, 'articulation')}
                    className="w-full rounded border px-2 py-1 text-xs"
                  >
                    <option value={1}>Sí</option>
                    <option value={0}>No</option>
                  </select>
                ) : (
                  <input
                    type="text"
                    value={formData[option.value] || ''}
                    onChange={(e) => handleChange(e, option.value)}
                    className="w-full rounded border px-2 py-1 text-xs"
                  />
                )
              ) : option.value === 'birthday' ? (
                format(new Date(item.birthday || new Date()), 'yyyy-MM-dd')
              ) : option.value === 'articulation' ? (
                item.articulation === 1 ? 'Sí' : 'No'
              ) : (
                item[option.value]
              )}
            </dd>
          </div>
        ))}
      </dl>

      {/* Buttons */}
      <div className="mt-6 flex justify-end gap-2">
        {!editando ? (
          <button
            onClick={() => setEditando(true)}
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm text-white hover:bg-orange-600"
          >
            Editar información
          </button>
        ) : (
          <button
            onClick={guardarCambios}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
          >
            Guardar cambios
          </button>
        )}
      </div>

      {/* Password */}
      <div className="mt-6">
        <PasswordCRUD />
      </div>
    </div>
  );
};

export default ProfileCard;
