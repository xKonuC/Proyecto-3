import React from 'react';

const FormHeader = ({ updateMessage, createMessage, update2Message, create2Message, updateId, itemName, pText }) => {
    const mainHeaderText = updateId ? (updateMessage || `Actualizar ${itemName}`) : (createMessage || `Crear ${itemName}`);
    const secondaryHeaderText = updateId ? (update2Message || `Actualizar ${itemName}`) : (create2Message || `Crear ${itemName}`);

    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold sm:text-3xl">
                {mainHeaderText}
            </h1>

            <h2 className="text-center text-lg font-medium">
                {secondaryHeaderText}
            </h2>

            <p className="mt-1 text-gray-500">{pText}</p>
        </div>
    );
};

export default FormHeader;
