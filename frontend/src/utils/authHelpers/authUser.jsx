import { setAccessToken, setIsAdminAccess, setRefreshToken } from "../cookieUtils";
import { decryptData, verifyData } from "../securityUtils";

class AuthUser {
    async authUser() {
        throw new Error('Sobrescribir para obtener la instancia de la Base de datos');
    }
}

class AuthUser_MySql extends AuthUser {
    authUser(session, isAdminAccess, navigate, showAlert) {
        if (session) {
            showAlert({
                type: 'verification',
                content: 'Ha iniciado sesión con éxito. Bienvenido',
            });
            if (session.message === 'Incorrect password') {
                showAlert({
                    type: 'error',
                    content: 'Ha ocurrido un error al intentar iniciar sesión. Por favor, verifica tus credenciales e inténtalo de nuevo',
                });
                return;
            }
            const accessToken = session.token.split(' ')[1];
            const refreshToken = session.refreshToken.split(' ')[1];
            setAccessToken(accessToken);
            setRefreshToken(refreshToken);
            if (isAdminAccess) {
                setIsAdminAccess(true);
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
    }
}

export { AuthUser_MySql as AuthUser };
