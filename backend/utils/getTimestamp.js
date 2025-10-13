import { utcToZonedTime, format } from 'date-fns-tz';

function getTimestamp() {
  const now = new Date();
  const timeZone = 'America/Santiago'; // Ajusta según sea necesario

  // Convertir la hora UTC a la hora local de Chile
  const chileTime = utcToZonedTime(now, timeZone);

  // Formatear la fecha y hora en el formato deseado
  const formattedDate = format(chileTime, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });

  return formattedDate;
}

export default getTimestamp;
