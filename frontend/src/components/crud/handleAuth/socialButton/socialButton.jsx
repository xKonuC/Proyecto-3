import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

// Componentes personalizados
import WithoutAccessTokenFetchService from '../../../../utils/crudHelpers/service/withoutAccessTokenService/withoutAccessTokenFetchService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';

import StyledButton from '../../../button/styledButton';

// Utilidades
import { verifyData } from '../../../../utils/securityUtils';

const SocialButton = ({ isAdminAccess, showAlert }) => {
    const navigate = useNavigate();

    const isMobile = window.innerWidth <= 600;

    const verifyAdministrative = () => {
        const isMySQL = import.meta.env.VITE_USE_MYSQL;
        const middlewareBaseURL = import.meta.env.VITE_MIDDLEWARE_URL_BASE;
        const serverAuthBaseURL = import.meta.env.VITE_SERVER_AUTH_URL_BASE;

        if (isMySQL) {
            showAlert({
                type: 'verification',
                content: 'Redirigiendo para iniciar sesión con tu correo institucional...',
            });
            window.location.replace(`${serverAuthBaseURL}/google/`);
            return null;
        }

        const authURL = isAdminAccess
            ? `${middlewareBaseURL}/auth/administrative/signinWithGoogle`
            : `${middlewareBaseURL}/auth/signinWithGoogle`;

        return authURL;
    };


    const signInWithGoogle = async () => {
        const url = verifyAdministrative();
        if (url !== null) {
            const fetchService = new WithoutAccessTokenFetchService(url, 'User', showAlert, responseHandler);
            await fetchService.execute({});
        }
    };

    // Función para manejar las respuestas de los servicios
    const responseHandler = (response) => {
        ResponseHandler({
            showAlert,
            navigate,
            response,
            onData: handleData,
        });
    };

    // Función para manejar los datos obtenidos
    const handleData = (data) => {
        if(data.url){
            showAlert({
                type: 'verification',
                content: 'Redirigiendo para iniciar sesión con tu correo institucional...',
            });
            const url = data.url;
            window.location.replace(url);
            return;
        }
        showAlert({
            type: 'error',
            content: 'Ha ocurrido un error al intentar iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo',
        });
    };

    return (
        <>
            <div className="flex w-full items-center justify-center gap-1 sm:gap-2">
                <StyledButton
                    onClick={() => signInWithGoogle()}
                    heightSM='11'
                    height='10'
                >
                    <FaGoogle size={25} />
                    {isMobile ? 'Ingresar con tu Correo' : 'Ingresar con tu Correo Institucional'}
                </StyledButton>
            </div>
        </>
    );
};

export default SocialButton;
