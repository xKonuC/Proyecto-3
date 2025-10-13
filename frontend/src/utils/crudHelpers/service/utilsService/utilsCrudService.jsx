import { getAccessToken } from "../../../cookieUtils";
import BaseService from "../baseService";

export default class UtilsCrudService extends BaseService {
    /**
     * Ejecuta la operación de eliminación de elementos.
     * @param {Object} params - Parámetros adicionales para la solicitud.
     * @param {Array} selectedItems - Elementos seleccionados para la eliminación.
     * @param {string} idPropertyName - Nombre de la propiedad que contiene los identificadores.
     * @param {string} idDeletedName - Nombre del identificador de elementos a eliminar.
     * @param {number} chunkSize - Tamaño del bloque para la eliminación por lotes.
     */
    async execute(params, selectedItems, idPropertyName, idDeletedName, chunkSize) {
        try {
            const access_token = getAccessToken();
            if (access_token) {
                if (selectedItems.length !== 0) {
                    this.showAlert({ type: 'waiting', content: null });
                    const idsToDelete = selectedItems.map(item => item[idPropertyName]);

                    for (let i = 0; i < idsToDelete.length; i += chunkSize) {
                        const chunk = idsToDelete.slice(i, i + chunkSize);

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
            }
        } catch (error) {
            this.onError(error);
        }
    }
}
