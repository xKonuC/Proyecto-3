import { POSTRequest } from './requestHelpers';
import { getRefreshToken, getAccessToken, removeTokens, setAccessToken, setRefreshToken } from './cookieUtils';
import { b64utos } from 'jsrsasign';

export const renewSession = async () => {
  try {
    const url = import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/auth/refreshToken';

    const refresh_token = getRefreshToken();
    const item = { refresh_token };
    const response = await POSTRequest(url, item);
    const { message, token, refreshToken } = response.token;
    if (message !== "updated token") {
      return {
        error: "Error durante el proceso de renovación. Por favor, intente nuevamente más tarde.",
      };
    }
    setAccessToken(token.split(' ')[1]);
    setRefreshToken(refreshToken.split(' ')[1]);

    return { renewalMessage: "La sesión ha sido renovada." };

  } catch (error) {
    console.error('Acceso denegado al renovar la sesión:', error.message);
    return {
      error: "Error al renovar la sesión. Por favor, intente nuevamente más tarde.",
    };
  }
};

export const getSession = async () => {
  const access_token = getAccessToken();

  if (!access_token) {
    return false;
  }

  const parts = access_token.split('.');

  if (parts.length !== 3) {
    return false;
  }

  const payload = JSON.parse(b64utos(parts[1]));

  try {
    // Verificar la fecha de expiración
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      const data = await renewSession()
      console.log(data.error === undefined)
      return data.error === undefined ? true : false;
    }

    // Verificar que el contador sea como máximo 10
    if (payload.counter > 10) {
      return false;
    }

  } catch (error) {
    console.error('Error al decodificar JWT:', error);
    return false;
  }

  return true;
};

export const deleteSession = () => {
  removeTokens();
};

export const deniedSession = (navigate) => {
  deleteSession();
  if (navigate) {
    navigate("/Login");
  }
};

export const verifyAuthAndRedirect = async (navigate) => {
  const session = await getSession();

  if (!session) {
    navigate("/Login");
  } else {
    try {
      const url = `${import.meta.env.VITE_MIDDLEWARE_URL_BASE}/auth/verifyAdministrative`;
      const access_token = getAccessToken();
      const item = { access_token };

      const response = await POSTRequest(url, item);
      if (!response.access_token) {
        deniedSession(navigate);
      }
    } catch (error) {
      console.error("Error de acceso denegado:", error.message);
      deniedSession(navigate);
    }
  }
};
