import UtilsCrudService from './utilsCrudService';
import { PUTRequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

/**
 * Servicio para la operación de eliminación de elementos.
 * Extiende CrudService para utilizar la lógica común CRUD.
 */
export default class UpdateUtilsService extends UtilsCrudService {
  /**
   * Realiza una solicitud DELETE para la eliminación de elementos.
   * @param {Object} config - Configuración de la solicitud DELETE.
   * @returns {Promise} - Promesa que se resuelve con la respuesta de la solicitud.
   */
  async request(config) {
    return await PUTRequest(this.url, config);
  }

  /**
   * Maneja errores específicos de la operación de eliminación.
   * @param {Error} error - Objeto de error capturado durante la operación de eliminación.
   */
  onError(error) {
    handleErrorResponse({
      error,
      customMessage: `Error updating ${this.itemName}`,
      showAlert: this.showAlert,
    });
  }
}
