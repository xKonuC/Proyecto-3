import { decryptData } from "../securityUtils";

class AuthWithGoogle {
    async authUser() {
        throw new Error('Sobrescribir para obtener la instancia de la Base de datos');
    }
}


class AuthWithGoogle_MySql extends AuthWithGoogle {
    authWithGoogle(navigate) {
        try {
            const queryString = window.location.href.split('?')[1];
            const params = queryString.split('&').reduce((acc, param) => {
                const [key, value] = param.split('=');
                acc[decodeURIComponent(key)] = decodeURIComponent(value);
                return acc;
            }, {});
            const session = decryptData(params.encryptedData, params.iv, import.meta.env.VITE_SECRET_ENCRYPT);
            const access_token = session.token;
            const refresh_token = session.refreshToken;

            if (!access_token || !refresh_token) {
                console.error('Los tokens en la sesión no son válidos');
                navigate("/Login");
            }

            return { access_token, refresh_token };
        } catch (error) {
            console.error('Error de acceso denegado:', error.message);
            navigate("/Login");
        }
    }
}


export { AuthWithGoogle_MySql as AuthWithGoogle };
