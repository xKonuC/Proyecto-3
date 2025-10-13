import { getAccessToken } from '../../../cookieUtils';
import BaseService from '../baseService';

export default class FileCrudService  extends BaseService {

    /**
         * Ejecuta una solicitud CRUD relacionada con archivos.
         * @param {Object} params - Parámetros de la solicitud CRUD.
         * @param {Array} selectedFile - Archivo seleccionado para la operación.
         */
    async execute(params, selectedFile) {
        try {
            const access_token = getAccessToken();
            if (access_token) {
                if (selectedFile) {
                    this.showAlert({ type: 'waiting', content: null });
                    const config = {
                        access_token: access_token,
                        ...params
                    };
                    const response = await this.request(config, selectedFile);
                    this.showAlert({ type: null, content: null });
                    this.onComplete(response);
                } else {
                    this.showAlert({ type: 'error', content: 'No se ha subido ningún archivo' });
                }
            } else {
                this.showAlert({ type: 'error', content: 'No tienes una sesión' });
            }
        } catch (error) {
            this.onError(error);
        }
    }
}
