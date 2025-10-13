import { DeleteStorage } from "../../repository/storage/deleteStorage";

describe('repository/storage/deleteStorage.js', ()=>{
    test('should return a successfully message', async()=>{
        const deleteStorageInstance = new DeleteStorage();
        const documentIDs = [8];
        const {result} = await deleteStorageInstance.deleteStorage(documentIDs);
        expect(typeof result[0].url).toBe('string');
        expect(typeof result[0].response).toBe('object');
    });
});