import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Componentes personalizados
import HandleAlert from '../../alert/handleAlert';

import AuthCreateService from '../../../utils/crudHelpers/service/authService/authCreateService';
import ResponseHandler from '../../../utils/crudHelpers/responseHandler';

import LoginContainer from '../../forms/body/loginContainer';
import TextInput from '../../input/textInput';
import PasswordInput from '../../input/passwordInput';
import RecoverPasswordButton from './recoverPassword/recoverPasswordButton';

// Utilidades
import { deniedSession, getSession } from '../../../utils/sessionHelpers';
import { isPasswordValid } from '../../../utils/validationUtils';
import { setAccessToken, setRefreshToken, setIsAdminAccess as setIsAdminSession } from '../../../utils/cookieUtils';

const UserIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={1.5}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

const HandleLogin = () => {
  const navigate = useNavigate();
  const [alertComponent, showAlert] = HandleAlert();

  const [newItem, setNewItem] = useState({
    email: '',
    password: '',
  });

  // Función para manejar el retorno del url para el inicio de sesión
  const verifyAdministrative = () => {
    const middlewareBaseURL = import.meta.env.VITE_MIDDLEWARE_URL_BASE;

    return isAdminAccess ? middlewareBaseURL + '/auth/administrative/signinWithEmail' : middlewareBaseURL + '/auth/student/signinWithEmail';
  };

  // Función para manejar el inicio de sesión del usuario
  const handleLogin = async (event) => {
    event.preventDefault();
    const validationPassword = isPasswordValid(newItem.password);
    if (validationPassword) {
      showAlert({
        type: 'error',
        content: validationPassword,
      });
      return;
    }
    const url = verifyAdministrative();
    const createService = new AuthCreateService(url, 'User',
      showAlert,
      responseHandler);
    await createService.execute({ ...newItem });
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
  const handleData = (session) => {
    if (session) {

      if (session.message !== 'logged in successfully') {
        showAlert({
          type: 'error',
          content: 'Ha ocurrido un error al intentar iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo',
        });
        return;
      }
      showAlert({
        type: 'verification',
        content: 'Ha iniciado sesión con éxito. Bienvenido',
      });
      const accessToken = session.token.split(' ')[1];
      const refreshToken = session.refreshToken.split(' ')[1];
      setAccessToken(accessToken);
      setRefreshToken(refreshToken);
      if (isAdminAccess) {
        setIsAdminSession(true);
        navigate("/Administrative");
      }
      else {
        navigate("/Dashboard");
      }
    }
    showAlert({
      type: 'error',
      content: 'Ha ocurrido un error al intentar iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo',
    });
  };

  useEffect(() => {
    const checkSession = async () => {
      if (navigate) {
        const session = await getSession(); // Obtener información de sesión

        if (session) {
          navigate("/VerifyAuth"); // Redirigir si hay una sesión activa
        } else {
          deniedSession(navigate); // Redirigir si no hay sesión
        }
      }
    };

    checkSession(); // Llamar la función asíncrona
  }, [navigate]);


  // -------------------------------Funciones de Extra-------------------------------
  const [isAdminAccess, setIsAdminAccess] = useState(false);

  const handleAdminAccessToggle = () => {
    setIsAdminAccess(!isAdminAccess);
  };

  return (
    <>
      {/* Componente para mostrar mensajes de alerta */}
      {alertComponent}
      <LoginContainer
        handleSubmit={handleLogin}
        isAdminAccess={isAdminAccess}
        showAlert={showAlert}
      >
        <div className="mb-4">
          <TextInput
            inputId={'emailUser'}
            label={'Email'}
            type={'email'}
            value={newItem.email}
            onChange={(e) => setNewItem({ ...newItem, email: e.target.value })}
            placeholder={`Ingresar Email`}
            icon={UserIcon}
          />
          <p className="mt-4 mb-1 text-end text-sm sm:text-md text-gray-500">
            <RecoverPasswordButton newItem={newItem} showAlert={showAlert} />
          </p>
          <PasswordInput
            label={'Contraseña'}
            inputId={'passwordUser'}
            value={newItem.password}
            onChange={(e) => setNewItem({ ...newItem, password: e.target.value })}
            placeholder={`Ingresar Contraseña`}
          />
        </div>
        <div className="ml-1 flex items-center justify-start">
          <input
            id="adminAccess"
            name="adminAccess"
            type="checkbox"
            checked={isAdminAccess}
            onChange={handleAdminAccessToggle}
            className="form-checkbox h-5 w-5 rounded border-orange-second text-orange-main transition duration-150 ease-in-out"
          />
          <label htmlFor="adminAccess" className="ml-2 text-center text-sm sm:text-md text-gray-600">Acceso a Sistema Administrativo</label>
        </div>
      </LoginContainer>
    </>
  );
};

export default HandleLogin;