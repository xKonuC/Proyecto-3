import React from 'react';
import '../../style/rainbow.css';
import PasswordCRUD from '../crud/profile/password/passwordCRUD';
import { format } from 'date-fns';

const getFormattedRoles = (roles) => {
  // Check if roles is a valid string before splitting
  if (roles && typeof roles === 'string') {
    return roles.split(';').map((role) => role.trim());
  } else {
    return [];
  }
};

const options = [
  { label: `RUT`, value: 'rut' },
  { label: `Sexo`, value: 'sex' },
  { label: `Estado Civil`, value: 'civilStatus' },
  { label: `Fecha de Nacimiento`, value: 'birthday' },
  { label: `Dirección`, value: 'address' },
  { label: `Lugar de Trabajo`, value: 'workPlace' },
  { label: `Número de Teléfono`, value: 'phone' },
  { label: `Teléfono de Trabajo`, value: 'phoneWork' },
  { label: `Ocupación`, value: 'job' },
  { label: `Articulación`, value: 'articulation' },
];

const ProfileCard = ({ item }) => {
  return (
    <div className="w-5/6 md:w-4/6 relative h-1/3 lg:h-72 overflow-hidden rounded-xl border bg-white shadow border-gray-100 p-4 sm:p-6 lg:p-8" >
      <span className="absolute inset-x-0 bottom-0 h-3">
        <div className="h-full w-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-300 animate-rainbow"></div>
      </span>

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
          <div className="col-span-full sm:col-span-1 font-normal sm:font-medium text-xs sm:text-sm ">
            {getFormattedRoles(item.roles).map((role, index) => (
              <span
                key={index}
                className={`mr-1 px-2.5 py-1 rounded ${role === 'SuperAdministrator' ? 'bg-blue-200 text-blue-800' : role === 'Administrador' ? 'bg-green-200 text-green-800' : (role === 'Académico' || role == 'AcadÃ©mico') ? 'bg-yellow-200 text-yellow-800' : role === 'Estudiante' ? 'bg-sky-200 text-sky-800' : 'bg-gray-100 text-gray-800'}`}
              >
                {role}
              </span>
            ))}
          </div>
        </div>

        <div className="">
        </div>
      </div>

      <div className="mt-0 flex justify-center">
        <p className="max-w-[40ch] text-sm text-gray-500">
        </p>
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
        {options.map((option, index) => (
          <div key={index} className="flex flex-col">
            <dt className="text-sm font-medium text-gray-600">{option.label}</dt>
            <dd className="text-xs mt-0.5 text-gray-500">
              {option.value === 'birthday'
                ? format(new Date(item[option.value] || new Date()), 'yyyy-MM-dd')
                : option.value === 'articulation'
                  ? item.articulation === 1
                    ? 'Sí'
                    : 'No'
                  : item[option.value]}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-2 sm:mt-6">
        <PasswordCRUD />
      </div>
    </div>
  );
};

export default ProfileCard;
