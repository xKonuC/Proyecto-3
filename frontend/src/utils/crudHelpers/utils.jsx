import { format } from "date-fns";
import { b64utos } from "jsrsasign";
import { dateOptions } from "./constants";
import { getAccessToken } from "../cookieUtils";

export const rolesStringToArray = (rolesString, rolesIdString) => {
  console.log(rolesIdString)
  console.log(rolesIdString)
  const roles = rolesString.split(';');
  const rolesIds = rolesIdString.split(';');
  const rolesArray = [];

  for (let i = 0; i < roles.length; i++) {
    rolesArray.push({
      value: parseInt(rolesIds[i], 10),
      label: roles[i],
    });
  }
  return rolesArray;
};

export const formatDateValue = (value, optionValue) => {
  // Mapa para convertir valores de 'sex' a su descripción completa
  const sexValuesMap = {
    'M': 'Masculino',
    'F': 'Femenino',
    'N': 'No Binario',
    'O': 'Otro',
  };

  const articulationValuesMap = {
    0: 'No',
    1: 'Si',
  }

  const habilitarDeshabilitarFields = [
    'finalGrade',
    'stage1_grade',
    'stage2_grade',
    'stage3_grade',
    'director_grade1',
    'director_grade2',
    'codirector_grade1',
    'codirector_grade2',
    'programDirector_grade1',
    'programDirector_grade2',
    'academicA_grade1',
    'academicA_grade2',
    'academicB_grade1',
    'academicB_grade2',
    'grade1',
    'grade2',
    'grade3',
  ];

  // Verifica si el valor de fecha no es null
  if (value !== null) {
    // Verifica si optionValue está en la lista de fechas
    if (dateOptions.includes(optionValue)) {
      try {
        if (value === null) {
          return null;
        } else if (optionValue === 'sex') {
          return sexValuesMap[value] || value; // Retorna la descripción completa o el valor original si no se encuentra
        } else if (optionValue === 'articulation' || optionValue === 'sameProgram' || optionValue === 'isIndexed') {
          return articulationValuesMap[value] || value
        } else if (optionValue === 'isActive') {
          return value ? 'Habilitado' : 'Deshabilitado';
        } else if (habilitarDeshabilitarFields.includes(optionValue)) {
          return value.toFixed(1);
        } else if (optionValue === 'creationDate' || optionValue === 'updateDate') {
          // Formatea la fecha con hora y minutos
          const date = new Date(value);
          // Suma 4 horas
          date.setHours(date.getHours() + 4);

          return format(date, 'yyyy-MM-dd HH:mm');
        } else {
          // Formatea la fecha con hora y minutos
          const date = new Date(value);
          // Suma 4 horas
          date.setHours(date.getHours() + 4);
          // Formatea la fecha sin hora ni minutos
          return format(date, 'yyyy-MM-dd');
        }
      } catch (error) {
        console.error("Error formateando la fecha:", error);
        return value; // En caso de error, retorna el valor sin formatear
      }
    } else {
      return value; // Si no es una fecha, retorna el valor sin cambios
    }
  } else {
    return value;
  }
};

export const generateRandomDate = () => {
  const now = new Date().getTime();
  const randomOffset = Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 365); // Rango de un año en milisegundos
  const randomDate = new Date(now + (Math.random() > 0.5 ? randomOffset : -randomOffset));

  // Agregar horas y minutos aleatorios
  const randomHours = Math.floor(Math.random() * 24);
  const randomMinutes = Math.floor(Math.random() * 60);
  randomDate.setHours(randomHours, randomMinutes);

  return randomDate.toISOString().split('T')[0]; // Convertir a formato 'YYYY-MM-DD'
};


const areObjectsEqual = (obj1, obj2) => JSON.stringify(obj1) === JSON.stringify(obj2);

export const compareQuestions = (currentQuestions, initialQuestions) => {
  const createdQuestions = currentQuestions.filter(
    (currentQ) => !initialQuestions.some((initialQ) => initialQ.rubricHasQuestionID === currentQ.rubricHasQuestionID)
  );
  const modifiedQuestions = currentQuestions.filter(
    (currentQ) =>
      initialQuestions.some(
        (initialQ) =>
          initialQ.rubricHasQuestionID === currentQ.rubricHasQuestionID &&
          (!areObjectsEqual(initialQ, currentQ) || initialQ.questionID !== currentQ.questionID)
      )
  );
  const deletedQuestions = initialQuestions.filter(
    (initialQ) => !currentQuestions.some((currentQ) => initialQ.rubricHasQuestionID === currentQ.rubricHasQuestionID)
  );

  return {
    createdQuestions,
    modifiedQuestions,
    deletedQuestions,
  };
};

export function isArray(arr) {
  return Array.isArray(arr);
}

export const getPropertyValue = (item, property) => {
  if (property.includes('.')) {
    // Dividir la cadena para acceder a cada nivel de la propiedad anidada
    const levels = property.split('.');
    let value = item;
    // Iterar sobre cada nivel y verificar si está definido
    for (let i = 0; i < levels.length; i++) {
      if (value && value.hasOwnProperty(levels[i])) {
        value = value[levels[i]];
      } else {
        // Si un nivel no está definido, establecer el valor en vacío y salir del bucle
        value = '';
        break;
      }
    }
    return value;
  } else {
    // Si la propiedad no está anidada, acceder directamente a ella
    return item[property];
  }
};

export const getTime = () => {
  const now = new Date();
  const timeZone = 'America/Santiago'; // Ajusta según sea necesario
  // Convertir la hora UTC a la hora local de Chile
  const chileTimeOffset = new Date(now.toLocaleString('en-US', { timeZone }));
  return chileTimeOffset;
};

export function isInDateRange(creationDate, updateDate, startDate, finishDate) {
  const dateToCheck = updateDate ? updateDate : creationDate;
  // cambiar a submit después
  return dateToCheck >= startDate && dateToCheck <= finishDate;
}

export function formatRemainingTime(creationDate, updateDate, finishDate) {
  const dateToCheck = updateDate ? updateDate : creationDate;
  const remainingTime = new Date(finishDate) - new Date(dateToCheck);

  if (remainingTime > 0) {
    const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
    const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));

    return `${days} días, ${hours} horas, ${minutes} minutos`;
  } else {
    const overdueTime = Math.abs(remainingTime);
    const minutes = Math.floor((overdueTime / (1000 * 60)) % 60);
    const hours = Math.floor((overdueTime / (1000 * 60 * 60)) % 24);
    const days = Math.floor(overdueTime / (1000 * 60 * 60 * 24));

    return `Vencido hace ${days} días, ${hours} horas, ${minutes} minutos`;
  }
}

export function calculateTime(lateMinutes) {
  if (lateMinutes === 0) {
    return { message: 'Entregado a tiempo', onTime: true };
  } else {
    const days = Math.floor((lateMinutes) / (60 * 24));
    const hours = Math.floor((lateMinutes % (60 * 24)) / 60);
    const minutes = lateMinutes % 60;
    return {
      message: `Enviado Atrasado ${(days * -1)} días, ${(hours * -1)} horas y ${(minutes * -1)} minutos`,
      onTime: false
    };
  }
}

export function verifyTokenAndMatchUserID(userID) {
  const access_token = getAccessToken();

  if (!access_token) {
    return false;
  }

  const parts = access_token.split('.');

  if (parts.length !== 3) {
    return false;
  }

  try {
    // Decodificar el payload del token
    const payload = JSON.parse(b64utos(parts[1]));
    // Verificar que el ID en el token sea igual al userID proporcionado
    if (payload.userID !== userID) {
      return false;
    }
  } catch (error) {
    console.error('Error al decodificar JWT:', error);
    return false;
  }

  return true;
}