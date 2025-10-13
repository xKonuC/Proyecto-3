import { DeleteTitle } from "../../../repository/handleTitle/title/deleteTitle";

describe('repository/handleTitle/title/deleteTitle.js', ()=>{
    test('should return a successfully message', async()=>{
        const deleteTitleInstance = new DeleteTitle();
        const titleIDs = [3];
        const {result} = await deleteTitleInstance.deleteTitle(titleIDs);
        expect(result.affectedRows).toBe(1);
    });
});