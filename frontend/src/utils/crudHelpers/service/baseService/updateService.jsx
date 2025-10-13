import CrudService from './crudService';
import { PUTRequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

export default class UpdateService extends CrudService {
  async request(config) {
    return await PUTRequest(this.url, config);
  }

  onError(error) {
    handleErrorResponse({
      error,
      customMessage: `Error creating ${this.itemName}`,
      showAlert: this.showAlert,
    });
  }
}
