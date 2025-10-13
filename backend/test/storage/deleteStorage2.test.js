import { DeleteStorage2 } from "../../repository/storage/deleteStorage2";

describe('repository/storage/deleteStorage.js', ()=>{
    test('should return a successfully message', async()=>{
        const deleteStorage2Instance = new DeleteStorage2();
        const studentHasTitleIDs = [6];
        const {result} = await deleteStorage2Instance.deleteStorage2(studentHasTitleIDs);
        expect(typeof result[0].url).toBe('string');
        expect(result[0].response.message).toBe('File deleted');
    });
});