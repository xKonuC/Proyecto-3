import React from 'react';
import StyledButton from '../styledButton';
import CancelIcon from '../../icon/handle/cancelIcon';

const FormButtonsNotUpdate = ({ handleSubmit, closeModal, customPath, message }) => {
    return (
        <div className="flex flex-col items-center gap-1 sm:flex-row sm:justify-center">
            <div className="flex-1 w-full sm:w-60">
                <StyledButton
                    onClick={handleSubmit}
                    type="submit"
                >
                    {customPath}
                    {message}
                </StyledButton>
            </div>
            <div className="flex-1 w-full sm:w-60">
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

export default FormButtonsNotUpdate;
