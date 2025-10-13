import BatchCrudService from './batchCrudService';
import { PUTRequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

export default class CreateBatchService extends BatchCrudService {
  async request(config) {
    return await PUTRequest(this.url, config);
  }

  onError(error) {
    handleErrorResponse({
      error,
      customMessage: `Error updating ${this.itemName}`,
      showAlert: this.showAlert,
    });
  }
}
