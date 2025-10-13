import BatchCrudService from './batchCrudService';
import { DELETERequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

export default class DeleteBatchService extends BatchCrudService {
  async request(config) {
    return await DELETERequest(this.url, config);
  }

  onError(error) {
    handleErrorResponse({
      error,
      customMessage: `Error deleting ${this.itemName}`,
      showAlert: this.showAlert,
    });
  }
}
