import { setAccessToken, setRefreshToken } from "../cookieUtils";
import { decryptData, verifyData } from "../securityUtils";

class RefreshSession {
    async refreshSession() {
        throw new Error('Sobrescribir para obtener la instancia de la Base de datos');
    }
}

class RefreshSession_MySql extends RefreshSession {
    refreshSession(data) {
        console.log(verifyData(data.token))
        const { encryptedData, iv } = verifyData(data.token);
        const { message, token, refreshToken } = decryptData(encryptedData, iv);
        if (message !== "updated token") {
            return {
                error: "Error durante el proceso de renovación. Por favor, intente nuevamente más tarde.",
            };
        }
        setAccessToken(token.split(' ')[1]);
        setRefreshToken(refreshToken.split(' ')[1]);

        return { renewalMessage: "La sesión ha sido renovada." };
    }
}

export { RefreshSession_MySql as RefreshSession };
