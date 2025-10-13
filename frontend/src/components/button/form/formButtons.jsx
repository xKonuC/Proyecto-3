import React from 'react';
import StyledButton from '../styledButton';
import CreateIcon from '../../icon/crud/createIcon';
import EditIcon from '../../icon/crud/editIcon';
import CancelIcon from '../../icon/handle/cancelIcon';

const FormButtons = ({ updateMessage, createMessage, handleSubmit, closeModal, updateId, itemName, isExpired }) => {
    const buttonText = updateId ? (updateMessage || `Actualizar ${itemName}`) : (createMessage || `Crear ${itemName}`);

    return (
        !isExpired && <div className="grid grid-cols-2 items-center gap-1 sm:flex-row sm:justify-center">
            <div className="col-span-full sm:col-span-1">
                <StyledButton
                    onClick={handleSubmit}
                    type="submit"
                >
                    {updateId ? <EditIcon /> : <CreateIcon />}
                    {buttonText}
                </StyledButton>
            </div>
            <div className="col-span-full sm:col-span-1">
                <StyledButton
                    onClick={closeModal}
                    color="red"
                >
                    <CancelIcon />
                    Cancelar
                </StyledButton>
            </div>
        </div>
    );
};

export default FormButtons;
