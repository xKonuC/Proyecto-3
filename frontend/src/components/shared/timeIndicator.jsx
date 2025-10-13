import React, { memo } from 'react';
import { getTime } from '../../utils/crudHelpers/utils';
import { format } from 'date-fns';

const TimeIndicator = memo (({ permission }) => {
    if (!permission || permission.dueDate === null) {
        return null;
    }

    const now = getTime();
    const dueDateTime = new Date(permission.dueDate);
    const difference = dueDateTime - now.getTime(); // Obtenemos la diferencia en milisegundos

    const daysDifference = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hoursDifference = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutesDifference = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    let statusText;
    let statusColor;

    if (difference > 0) {
        statusText = `El Plazo finaliza en ${daysDifference} días, ${hoursDifference} horas, y ${minutesDifference} minutos`;
        statusColor = 'green-500';
    } else if (difference === 0) {
        statusText = 'Vence Ahora';
        statusColor = 'orange-main';
    } else {
        statusText = `El Plazo ha finalizado hace ${Math.abs(daysDifference)} días, ${Math.abs(hoursDifference)} horas, y ${Math.abs(minutesDifference)} minutos`;
        statusColor = 'red-500';
    }

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
            <span className="block text-center text-sm sm:text-base text-gray-500">{permission.label} {format(new Date(permission.dueDate), 'yyyy-MM-dd HH:mm')}</span>
            {/* <span className={`block text-sm sm:text-base px-2 py-1 font-bold rounded bg-${statusColor} text-white`}>
                {statusText}
            </span> */}
        </div>
    );
});

export default TimeIndicator;
