import CrudService from './crudService';
import { GETRequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

export default class FetchService extends CrudService {
  async request(config) {
    return await GETRequest(this.url, config);
  }

  onError(error) {
    handleErrorResponse({
      error,
      customMessage: `Error searching ${this.itemName}`,
      showAlert: this.showAlert,
    });
  }
}
