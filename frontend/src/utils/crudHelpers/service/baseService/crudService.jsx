import { getAccessToken } from "../../../cookieUtils";
import BaseService from "../baseService";

export default class CrudService extends BaseService {
    /**
     * Ejecuta una solicitud CRUD utilizando el token de acceso.
     * @param {Object} params - Parámetros de la solicitud CRUD.
     */
    async execute(params = {}) {
        try {
            const access_token = getAccessToken();
            if (access_token) {
                this.showAlert({ type: 'waiting', content: null });
                const config = {
                    ...params,
                    access_token,
                };
                const response = await this.request(config);
                this.showAlert({ type: null, content: null });
                this.onComplete(response);
            } else {
                this.showAlert({ type: 'error', content: 'No tienes una sesión' });
            }
        } catch (error) {
            console.log(error)
            this.onError(error);
        }
    }
}
