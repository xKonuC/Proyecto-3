import BaseService from '../baseService'

export default class WithoutAccessTokenCrudService extends BaseService {
    /**
     * Ejecuta una solicitud CRUD sin verificación el token de acceso.
     * @param {Object} params - Parámetros de la solicitud CRUD.
     */
    async execute(params) {
        try {
            this.showAlert({ type: 'waiting', content: null });
            const config = {
                ...params,
            };
            const response = await this.request(config);
            this.showAlert({ type: null, content: null });
            this.onComplete(response);
        } catch (error) {
            console.log(error);
            this.onError(error);
        }
    }

}
