import { deniedSession } from "../sessionHelpers";

export const handleDeniedError = (errorMessage, showAlert, navigate) => {
    showAlert({
        type: 'error',
        content: errorMessage,
    });

    deniedSession(navigate);
};

export const handleGenericMessage = (message, showAlert) => {
    if (message && message.message !== undefined) {
        showAlert({
            type: 'error',
            content: message.message,
        });
        return;
    }

    showAlert({
        type: 'error',
        content: message,
    });
};

export const handleValidationErrors = (validationErrors, showAlert) => {
    const errorList = validationErrors.map((error, index) => (`${index + 1}. ${error.msg}`)).join('<br/>');
    const formattedErrorList = { __html: errorList };

    showAlert({
        type: 'error',
        content: (
            <div>
                <p>Se encontraron los siguientes errores:</p>
                <div dangerouslySetInnerHTML={formattedErrorList} />
            </div>
        ),
    });
};

export const handleUnknownError = (error, showAlert) => {
    if (Object.keys(error).length === 0) {
        showAlert({
            type: 'error',
            content: 'Error desconocido',
        });
    } else if (error.message !== undefined) {
        showAlert({
            type: 'error',
            content: error.message,
        });
    } else {
        showAlert({
            type: 'error',
            content: error,
        });
    }
};

export const handleUnexpectedError = (showAlert) => {
    showAlert({
        type: 'error',
        content: 'Error Inesperado',
    });
};
