import CrudService from './crudService';
import { PUTRequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

export default class UpdateService extends CrudService {
  async request(config) {
    // Extract userID from config to append to URL
    const { userID, ...restConfig } = config;
    const url = userID ? `${this.url}/${userID}` : this.url;
    return await PUTRequest(url, restConfig);
  }

  onError(error) {
    handleErrorResponse({
      error,
      customMessage: `Error updating ${this.itemName}`,
      showAlert: this.showAlert,
    });
  }
}
