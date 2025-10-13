import React from 'react';
import DatePicker, { registerLocale } from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import  es  from 'date-fns/locale/es';
registerLocale('es', es);


const DateInput = ({ selectId, placeholderText, dateFormat = 'dd/MM/yyyy HH:mm', showTime = true, value, onChange }) => {
    const handleDateChange = (date) => {
        onChange(date);
    };

    return (
        <div className="relative flex items-center">
            <DatePicker
                locale="es"
                wrapperClassName="w-full"
                id={selectId}
                name={selectId}
                className="w-full h-9 sm:h-10 rounded-lg border-gray-500 p-4 pl-10 shadow-sm text-xs sm:text-sm text-start relative"
                selected={value ? new Date(value) : null}
                onChange={handleDateChange}
                showTimeSelect={showTime} // Correctly use the showTime prop to control showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat={dateFormat}
                timeCaption="Hora"
                placeholderText={placeholderText}
                popperPlacement="bottom"
            />
            <span className="absolute inset-y-0 left-3 flex items-center pr-6">
                <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
            </span>
        </div>
    );
};

export default DateInput;
