export function convertToTime(dueDate) {
  // Convertir dueDate a objeto Date
  const date = new Date(dueDate);

  // Obtener el desplazamiento de la zona horaria chilena (en milisegundos)
  const timezoneOffset = 60 * 1000; // -240 minutos (4 horas) * 60 segundos * 1000 milisegundos

  // Ajustar la fecha a la hora chilena
  const localDate = new Date(date.getTime() + timezoneOffset);

  // Formatear la fecha al formato deseado para la base de datos
  const formattedDueDate = localDate.toISOString().slice(0, 19).replace('T', ' ');

  return formattedDueDate;
}
