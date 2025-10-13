import { UpdateStudentHasTitle } from "../../../repository/handleTitle/studentHasTitle/updateStudentHasTitle";

describe('repository/handleTitle/studentHasTitle/updateStudentHasTitle.js', ()=>{
    test('should return a successfully mesage', async()=>{
        const updateStudentHasTitleInstance = new UpdateStudentHasTitle();
        const studentHasTitleID =2
        const titleID = 2;
        const titleYear = 2012;
        const{ result} = await updateStudentHasTitleInstance.updateStudentHasTitle(studentHasTitleID,titleID,titleYear);
        expect(result.affectedRows).toBe(1);
    });
});