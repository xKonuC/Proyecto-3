import { getAccessToken } from '../../../cookieUtils';
import BaseService from '../baseService';

export default class BatchCrudService extends BaseService {

    /**
     * Ejecuta una solicitud CRUD en lotes utilizando el token de acceso.
     * @param {Object} params - Parámetros de la solicitud CRUD.
     * @param {Array} selectedItems - Array de ítems seleccionados.
     * @param {string} idDeletedName - Nombre del campo que identifica los ítems a eliminar.
     * @param {number} chunkSize - Tamaño del lote para las operaciones en lotes.
     */
    async execute(params, selectedItems, idDeletedName, chunkSize) {
        try {
            const access_token = getAccessToken();
            if (access_token) {
                if (selectedItems.length !== 0) {
                    this.showAlert({ type: 'waiting', content: null });
                    for (let i = 0; i < selectedItems.length; i += chunkSize) {
                        const chunk = selectedItems.slice(i, i + chunkSize);
                        const config = {
                            access_token: access_token,
                            [idDeletedName]: chunk,
                            ...params
                        };
                        const response = await this.request(config);
                        this.showAlert({ type: null, content: null });
                        this.onComplete(response);
                    }
                }
            } else {
                this.showAlert({ type: 'error', content: 'No tienes una sesión' });
            }
        } catch (error) {
            this.onError(error);
        }
    }
}
