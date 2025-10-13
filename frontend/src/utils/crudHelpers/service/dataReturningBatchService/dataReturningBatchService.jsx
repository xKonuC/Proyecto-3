import { getAccessToken } from '../../../cookieUtils';
import BaseService from '../baseService';

export default class DataReturningBatchService extends BaseService {
    /**
     * Ejecuta una solicitud CRUD en lotes y retorna los datos de la respuesta.
     * @param {Object} params - Parámetros de la solicitud CRUD.
     * @param {Array} selectedItems - Array de ítems seleccionados.
     * @param {string} idDeletedName - Nombre del campo que identifica los ítems a eliminar.
     * @param {number} chunkSize - Tamaño del lote para las operaciones en lotes.
     * @returns {Promise<Array>} - Promesa que resuelve con los datos de todas las respuestas.
     */
    async execute(params, selectedItems, idDeletedName, chunkSize) {
        const allResponses = [];
        try {
            const access_token = getAccessToken();
            if (!access_token) {
                throw new Error('No tienes una sesión');
            }

            if (selectedItems.length === 0) {
                return allResponses;
            }

            this.showAlert({ type: 'waiting', content: null });
            for (let i = 0; i < selectedItems.length; i += chunkSize) {
                const chunk = selectedItems.slice(i, i + chunkSize);
                const config = {
                    access_token: access_token,
                    [idDeletedName]: chunk,
                    ...params
                };

                const response = await this.request(config);
                allResponses.push(...response);
            }

            this.showAlert({ type: null, content: null });
            return allResponses;
        } catch (error) {
            this.onError(error);
            return allResponses; // Podrías decidir retornar los errores o manejarlos de manera diferente
        }
    }
}
