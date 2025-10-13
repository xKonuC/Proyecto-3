import { DeleteStudentHasTitle } from "../../../repository/handleTitle/studentHasTitle/deleteStudentHasTitle";

describe('repository/handleTitle/studentHasTitle/deleteStudentHasTitle.js', ()=>{
    test('should return a successfully message', async()=>{
        const deleteStudentHasTitleInstance = new DeleteStudentHasTitle();
        const studentHasTitleIDs = [4,5];
        const {result} = await deleteStudentHasTitleInstance.deleteStudentHasTitle(studentHasTitleIDs);
        expect(result.affectedRows).toBe(studentHasTitleIDs.length);
    });
});