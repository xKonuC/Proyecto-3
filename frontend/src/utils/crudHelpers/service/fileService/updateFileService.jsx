import FileCrudService from './fileCrudService';
import { PUTFileRequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

export default class UpdateFileService extends FileCrudService {
  async request(config, file) {
    return await PUTFileRequest(this.url, config, file);
  }

  onError(error) {
    handleErrorResponse({
      error,
      customMessage: `Error update ${this.itemName}`,
      showAlert: this.showAlert,
    });
  }
}
