import CrudService from './crudService';
import { GETRequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

export default class FetchService extends CrudService {
  async request(config) {
    return await GETRequest(this.url, config);
  }

  onError(error) {
    console.error(`Error en FetchService para ${this.itemName}:`, error);
    handleErrorResponse({
      error,
      customMessage: `Error buscando ${this.itemName}`,
      showAlert: this.showAlert,
    });
  }
}
