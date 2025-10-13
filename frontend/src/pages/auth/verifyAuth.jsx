import React, { useEffect } from "react";
import Loader from '../../components/loader/Loader';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

import { getIsAdminAccess } from '../../utils/cookieUtils';
import { getSession, deniedSession } from '../../utils/sessionHelpers';
import { POSTRequest } from '../../utils/requestHelpers';

// Componente para verificar la autenticación del usuario
export const VerifyAuth = () => {
  const navigate = useNavigate();

  // Efecto para verificar la autenticación al montar el componente
  useEffect(() => {
    const checkAuth = async () => {
      if (navigate) {
        const session = await getSession(); // Obtener información de sesión del usuario

        if (session) {
          if (!getIsAdminAccess()) {
            navigate("/Dashboard"); // Redirigir si el usuario no es administrador
            return;
          }

          // Verificar autenticación del usuario
          const verifyAuth = async () => {
            const url = `${import.meta.env.VITE_MIDDLEWARE_URL_BASE}/auth/verifyAdministrative`;

            try {
              const access_token = Cookies.get('access_token'); // Obtener token de acceso
              if (!access_token) {
                return deniedSession(navigate); // Redirigir si no hay token
              }

              const response = await POSTRequest(url, { access_token }); // Solicitud POST

              if (response.access_token) {
                navigate("/Administrative"); // Redirigir si el token es válido
              } else if (response.errorDenied) {
                navigate("/Dashboard"); // Redirigir si el acceso es denegado
              } else {
                deniedSession(navigate); // Redirigir si hay otro error
              }
            } catch (error) {
              console.error('Error de acceso denegado:', error.message);
              deniedSession(navigate); // Redirigir si ocurre un error en la solicitud
            }
          };

          await verifyAuth(); // Llamar a la función de verificación
        } else {
          deniedSession(navigate); // Redirigir si no hay sesión
        }
      }
    };

    checkAuth(); // Llamar la función asíncrona
  }, [navigate]);


  return (
    <main>
      <Loader /> {/* Mostrar un loader mientras se verifica la autenticación */}
    </main>
  )
};
