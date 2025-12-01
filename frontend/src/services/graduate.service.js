import { GETRequest, POSTRequest, PUTRequest, DELETERequest } from '../utils/requestHelpers';

const BASE_URL = import.meta.env.VITE_MIDDLEWARE_URL_BASE + '/graduates';

const GraduateService = {
  getAll: async () => {
    return await GETRequest(BASE_URL);
  },

  getById: async (id) => {
    return await GETRequest(`${BASE_URL}/${id}`);
  },

  create: async (data) => {
    // Mapear campos antes de enviar
    const mappedData = {
      ...data,
      job: data.job || data.jobTitle,
      entryYear: data.entryYear || data.entry,
    };
    
    // Eliminar campos que no deben enviarse
    delete mappedData.jobTitle;
    delete mappedData.entry;
    delete mappedData.administratorID;
    delete mappedData.graduateID;
    delete mappedData.userID; // El backend crea el usuario automáticamente
    delete mappedData.createdAt;
    delete mappedData.updatedAt;
    
    return await POSTRequest(BASE_URL, mappedData);
  },

  update: async (id, data) => {
    // Mapear campos antes de enviar
    const mappedData = {
      ...data,
      job: data.job || data.jobTitle,
      entryYear: data.entryYear || data.entry,
    };
    
    // Eliminar campos que no deben enviarse
    delete mappedData.jobTitle;
    delete mappedData.entry;
    delete mappedData.administratorID;
    delete mappedData.graduateID;
    delete mappedData.userID;
    delete mappedData.createdAt;
    delete mappedData.updatedAt;
    
    return await PUTRequest(`${BASE_URL}/${id}`, mappedData);
  },

  delete: async (id) => {
    return await DELETERequest(`${BASE_URL}/${id}`);
  }
};

export default GraduateService;
