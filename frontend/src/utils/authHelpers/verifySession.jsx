import { b64utos } from "jsrsasign";
import { getAccessToken } from "../cookieUtils";

class VerifySession {
    async verifySession() {
        throw new Error('Sobrescribir para obtener la instancia de la Base de datos');
    }
}

class VerifySession_MySql extends VerifySession {
    verifySession() {
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
                return false;
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
    }
}

export { VerifySession_MySql as VerifySession };
