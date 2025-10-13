import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

// Componentes personalizados
import HandleAlert from '../../../alert/handleAlert';

import WithoutAccessTokenCreateService from '../../../../utils/crudHelpers/service/withoutAccessTokenService/withoutAccessTokenCreateService';
import ResponseHandler from '../../../../utils/crudHelpers/responseHandler';

import ChangePasswordContainer from '../../../forms/body/ChangePasswordContainer'

// Utilidades
import { isPasswordValid } from '../../../../utils/validationUtils';
import { AuthWithGoogle } from '../../../../utils/authHelpers/authWithGoogle';

const ChangePasswordForm = () => {

    const navigate = useNavigate();
    const [alertComponent, showAlert] = HandleAlert();
    const [newItem, setNewItem] = useState({
        access_token: '',
        password: '',
    });

    // Función para manejar el cambio de contraseña
    const handleChangePassword = async (event) => {
        event.preventDefault();
        if (!newItem.access_token) {
            showAlert({
                type: 'error',
                content: 'No tienes permiso para cambiar la contraseña.',
            });
            return;
        }
        const validationPassword = isPasswordValid(newItem.password);
        if (validationPassword) {
            showAlert({
                type: 'error',
                content: validationPassword,
            });
            return;
        }

        const url = import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/auth/changePassword';

        const createService = new WithoutAccessTokenCreateService(url, 'User', showAlert, responseHandler);

        await createService.execute({ ...newItem });
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
        navigate("/Login");
    };
    useEffect(() => {
        const getAccessToken = async () =>{
            const queryString = window.location.href.split('?')[1];
            const params = queryString.split('&').reduce((acc, param) => {
                const [key, value] = param.split('=');
                acc[decodeURIComponent(key)] = decodeURIComponent(value);
                return acc;
            }, {});
            const otp = params.otp;    
            const res = await fetch(`${import.meta.env.VITE_SERVER_AUTH_URL_BASE}/token/validateOTP`, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${otp}`,
                  'Origin': `${import.meta.env.VITE_APP_API_BASE_URL}`,
                  'Content-Type': 'application/json'
                }
              });
            const data =  await res.json();
            const {token, refreshToken} = data;      
            if (token && refreshToken) {
                setNewItem({ ...newItem, 
                    access_token: token,                
                });
            }
            else {
                navigate("/Login");
            }
    
        }
        getAccessToken();
    }, []);

    return (
        <>
            {/* Componente para mostrar mensajes de alerta */}
            {alertComponent}

            <ChangePasswordContainer
                newItem={newItem}
                setNewItem={setNewItem}
                handleSubmit={handleChangePassword}
            >
            </ChangePasswordContainer>
        </>
    );
};

export default ChangePasswordForm;
