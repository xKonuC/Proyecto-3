/* eslint-disable no-prototype-builtins */
/* eslint-disable no-param-reassign */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
import { InviteUsers } from '../../../../../../repository/import/InviteUsers.js';
import { CreateStudents } from '../../../../../../repository/import/createStudents.js';
import { GetRole } from '../../../../../../repository/utils/getRole.js';

const excelNumberToDate = (value) => {
  const msPerDay = 24 * 60 * 60 * 1000; // Milisegundos por día
  const epochStart = Date.UTC(1900, 0, 1); // Fecha de inicio del número de serie

  // El valor de Excel 1 es 1900-01-01, pero Excel tiene un error donde cuenta 1900 como año bisiesto.
  // Entonces debemos restar 1 día extra (msPerDay) si el valor es mayor o igual a 60.
  const dateOffset = value >= 60 ? msPerDay : 0;

  const dateValue = new Date(epochStart + (value - 1) * msPerDay + dateOffset); // Restar 1 día y sumar el offset si es necesario

  // Ajustar la fecha a la hora chilena (GMT-4)
  const timezoneOffset = -240 * 60 * 1000; // -240 minutos (4 horas) * 60 segundos * 1000 milisegundos
  const localDate = new Date(dateValue.getTime() + timezoneOffset);

  // Formatear la fecha al formato deseado
  return localDate.toISOString().slice(0, 19).replace('T', ' ');
};

const inviteUsers = async (req, res) => {
  const { excelData } = req;
  const inviteUsersInstance = new InviteUsers();
  const getRoleInstance = new GetRole();
  const createStudentsInstance = new CreateStudents();
  try {
    const header = req.header('Authorization') || '';
    const access_token = header.split(' ')[1];
    const roles = await getRoleInstance.getRole();
    const studentRoleId = roles.Estudiante;

    const acceptedFiles = [
      { label: 'RUT', value: 'rut' },
      { label: 'Email', value: 'email' },
      { label: 'Email Personal', value: 'personalEmail' },
      { label: 'Primer Nombre', value: 'firstName' },
      { label: 'Segundo Nombre', value: 'secondName' },
      { label: 'Primer Apellido', value: 'surname1' },
      { label: 'Segundo Apellido', value: 'surname2' },
      { label: 'Sexo', value: 'sex', type: 'string' },
      { label: 'Estado Civil', value: 'civilStatus' },
      { label: 'Fecha de Nacimiento', value: 'birthday' },
      { label: 'Dirección', value: 'address' },
      { label: 'Lugar de Trabajo', value: 'workPlace' },
      { label: 'Número de Teléfono', value: 'phone' },
      { label: 'Teléfono de Trabajo', value: 'phoneWork' },
      { label: 'Ocupación', value: 'job' },
      { label: 'Articulación', value: 'articulation' },
      { label: 'Cohorte', value: 'entry' },
      { label: 'Grupo', value: 'group' },
    ];

    for (const data of excelData) {
      acceptedFiles.forEach((file) => {
        if (data.hasOwnProperty(file.label)) {
          data[file.value] = data[file.label];
          delete data[file.label];
        }
      });
      if (typeof data.birthday === 'number') {
        data.birthday = excelNumberToDate(data.birthday);
      }
      const user = await inviteUsersInstance.inviteUsers(data, access_token);
      if (user && user.id) {
        const enrichedData = { userID: user.id, roleID: studentRoleId };
        await createStudentsInstance.createStudents(enrichedData);
      }
    }
    res.status(200).json({ verificationMessage: 'Los datos han sido subidos exitosamente' });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({ message: error.message || 'Error interno del servidor' });
  }
};

export default inviteUsers;
