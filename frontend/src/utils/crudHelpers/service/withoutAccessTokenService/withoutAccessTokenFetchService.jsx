import WithoutAccessTokenCrudService from './withoutAccessTokenCrudService';
import { GETRequest } from '../../../requestHelpers';
import { handleErrorResponse } from '../../handleErrorResponse';

export default class WithoutAccessTokenFetchService extends WithoutAccessTokenCrudService {
  async request(config) {
    return await GETRequest(this.url, config);
  }

  onError(error) {
    handleErrorResponse({
      error,
      customMessage: `Error fetching ${this.itemName}`,
      showAlert: this.showAlert,
    });
  }
}
