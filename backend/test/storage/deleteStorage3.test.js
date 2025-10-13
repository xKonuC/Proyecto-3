import { DeleteStorage3 } from "../../repository/storage/deleteStorage3.js";

describe('repository/storage/deleteStorage3.js', ()=>{
    test(' should return a successfully message', async()=>{
        const deleteStorage3Instance = new DeleteStorage3();
        const {result} = await deleteStorage3Instance.deleteStorage3([6]);
        expect(typeof result[0].url).toBe('string');
        expect( result[0].response.message).toBe('File deleted');
    }, 10000);
});