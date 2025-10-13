/**
 * Clase base para servicios CRUD.
 *
 * @class BaseService
 * @param {string} url - URL del servicio CRUD.
 * @param {string} itemName - Nombre del ítem manipulado por el servicio.
 * @param {function} setMessage - Función para establecer mensajes en el componente.
 * @param {function} onComplete - Función que maneja la respuesta exitosa del servicio.
 */
export default class BaseService {
    /**
     * Crea una instancia de BaseService.
     * @constructor
     * @param {string} url - URL del servicio CRUD.
     * @param {string} itemName - Nombre del ítem manipulado por el servicio.
     * @param {function} setMessage - Función para establecer mensajes en el componente.
     * @param {function} onComplete - Función que maneja la respuesta exitosa del servicio.
     */
    constructor(url, itemName, showAlert, onComplete) {
        this.url = url;
        this.itemName = itemName;
        this.showAlert = showAlert;
        this.onComplete = onComplete;
    }

    /**
     * Método abstracto para realizar una solicitud CRUD.
     *
     * @async
     * @param {Object} params - Parámetros de la solicitud CRUD.
     * @throws {Error} - Lanza un error si no está implementado.
     */
    async execute(params) {
        throw new Error('Método no implementado');
    }

    /**
     * Método abstracto para realizar la solicitud CRUD.
     * Debe ser implementado por las clases derivadas.
     *
     * @abstract
     * @param {Object} config - Configuración de la solicitud CRUD.
     * @throws {Error} - Lanza un error si no está implementado.
     */
    request(config) {
        throw new Error('Método no implementado');
    }

    /**
     * Método abstracto para manejar errores durante la solicitud CRUD.
     * Debe ser implementado por las clases derivadas.
     *
     * @abstract
     * @param {Error} error - Objeto de error capturado durante la solicitud.
     * @throws {Error} - Lanza un error si no está implementado.
     */
    onError(error) {
        throw new Error('Método no implementado');
    }
}
