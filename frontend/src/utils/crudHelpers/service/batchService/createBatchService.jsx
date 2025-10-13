import BatchCrudService from './batchCrudService';
import { POSTRequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

export default class CreateBatchService extends BatchCrudService {
  async request(config) {
    return await POSTRequest(this.url, config);
  }

  onError(error) {
    handleErrorResponse({
      error,
      customMessage: `Error creating ${this.itemName}`,
      showAlert: this.showAlert,
    });
  }
}
