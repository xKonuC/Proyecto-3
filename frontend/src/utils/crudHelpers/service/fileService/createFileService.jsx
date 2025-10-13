import FileCrudService from './fileCrudService';
import { POSTFileRequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

export default class CreateFileService extends FileCrudService {
  async request(config, file) {
    return await POSTFileRequest(this.url, config, file);
  }

  onError(error) {
    handleErrorResponse({
      error,
      customMessage: `Error creating ${this.itemName}`,
      showAlert: this.showAlert,
    });
  }
}
