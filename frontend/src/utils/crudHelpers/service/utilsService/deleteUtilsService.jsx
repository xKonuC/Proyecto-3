import UtilsCrudService from './utilsCrudService';
import { DELETERequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

/**
 * Servicio para la operación de eliminación de elementos.
 * Extiende CrudService para utilizar la lógica común CRUD.
 */
export default class DeleteUtilsService extends UtilsCrudService {
  /**
   * Realiza una solicitud DELETE para la eliminación de elementos.
   * @param {Object} config - Configuración de la solicitud DELETE.
   * @returns {Promise} - Promesa que se resuelve con la respuesta de la solicitud.
   */
  async request(config) {
    return await DELETERequest(this.url, config);
  }

  /**
   * Maneja errores específicos de la operación de eliminación.
   * @param {Error} error - Objeto de error capturado durante la operación de eliminación.
   */
  onError(error) {
    handleErrorResponse({
      error,
      customMessage: `Error deleting ${this.itemName}`,
      showAlert: this.showAlert,
    });
  }
}
