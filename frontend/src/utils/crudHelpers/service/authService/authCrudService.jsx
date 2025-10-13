import { getAccessToken } from '../../../cookieUtils';
import BaseService from '../baseService';

export default class AuthCrudService extends BaseService {
    /**
     * Ejecuta una solicitud CRUD verificando el token de acceso.
     * @param {Object} params - Parámetros de la solicitud CRUD.
     */
    async execute(params) {
        try {
            const access_token = getAccessToken();
            if (!access_token) {
                this.showAlert({ type: 'waiting', content: null });
                const config = {
                    ...params,
                };
                const response = await this.request(config);
                this.showAlert({ type: null, content: null });
                this.onComplete(response);
            } else {
                this.showAlert({ type: 'error', content: 'Ya tienes una sesión activa. Cierra la sesión actual para continuar' });
            }
        } catch (error) {
            this.onError(error);
        }
    }
}
