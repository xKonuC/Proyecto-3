import { DeleteBodyAcademic } from "../../../repository/handleTitle/bodyacademic/deleteBodyAcademic";

describe('repository/handleTitle/bodyAcademic/deleteBodyAcademic.js', ()=>{
    test('should return an successfully message', async ()=>{
        const deleteBodyAcademicInstance = new DeleteBodyAcademic();
        const ids = [2];
        const { result } = await deleteBodyAcademicInstance.deleteBodyAcademic(ids);
        expect(result.affectedRows).toBe(ids.length);
    });
});