import { CreateStorage } from "../../repository/storage/createStorage";

describe('repository/storage/createStorage.js', ()=>{
    test('should return a successfully message', async()=>{
        const createStorageInstance = new CreateStorage();
        const file = {
            buffer: 'contenido del archivo',
            originalname: 'archivo.txt',
            mimetype: 'text/plain',
          };
        const result = await createStorageInstance.createStorage(file);
        expect(typeof result).toBe('string');

    });
});