import WithoutAccessTokenCrudService from './withoutAccessTokenCrudService';
import { POSTRequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

export default class WithoutAccessTokenCreateService extends WithoutAccessTokenCrudService {
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
