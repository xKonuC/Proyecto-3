import { SelectAcademicHasTitle } from "../../../repository/handleTitle/academicHasTitle/selectAcademicHasTitle";

describe('repository/handleTitle/academicHasTitle/selectAcademicHasTitle.js', ()=>{
    test('should return an academic info', async ()=>{
        const selectAcademicHasTitleInstance = new SelectAcademicHasTitle();
        const userID = 2;
        const {result} = await selectAcademicHasTitleInstance.selectAcademicHasTitle(userID);
        expect(Array.isArray(result));

    });
});