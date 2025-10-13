import { SelectAcademicHasTitle } from "../../../repository/handleTitle/academicHasTitle/selectAcademicHasTitle";

describe('repository/handleTitle/studentHasTitle/selectStudentHasTitle.js', ()=>{
    test('should return a student info', async()=>{
        const selectStudentHasTitleInstance = new SelectAcademicHasTitle();
        const userID = 2;
        const {result} = await selectStudentHasTitleInstance.selectAcademicHasTitle(userID);
        expect(Array.isArray(result)).toBe(true);
    });
});