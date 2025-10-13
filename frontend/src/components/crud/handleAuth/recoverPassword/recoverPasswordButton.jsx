import React from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes personalizados
import AuthCreateService from '../../../../utils/crudHelpers/service/authService/authCreateService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';

const RecoverPasswordButton = ({ newItem, showAlert }) => {

    const navigate = useNavigate();
    // Función para manejar la recuperación de contraseña
    const handleRecoverPassword = async () => {
        if (newItem.email) {

            const url = import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/auth/recoverPassword';
            // Instancias de los servicios
            const createService = new AuthCreateService(url, 'User', showAlert, responseHandler);
            await createService.execute(
                { email: newItem.email }
            );
        }
        else {
            showAlert({
                type: 'error',
                content: 'Por favor, ingrese su dirección de correo electrónico',
            });
        }
    }

    // Función para manejar las respuestas de los servicios
    const responseHandler = (response) => {
        ResponseHandler({
            showAlert,
            navigate,
            response,
            onVerification: handleVerification,
        });
    };

    // Función para manejar la verificación
    const handleVerification = async (message) => {
        showAlert({
            type: 'verification',
            content: message,
        });
    };

    return (
        <>
            <button
                type="button"
                onClick={handleRecoverPassword}
                className="hover:font-semibold hover:text-orange-main hover:underline focus:text-orange-main"
            >
                ¿Olvidaste tu contraseña?
            </button>
        </>
    );
};

export default RecoverPasswordButton;
