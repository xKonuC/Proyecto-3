import { UpdateAcademicHasTitle } from "../../../repository/handleTitle/academicHasTitle/updateAcademicHasTitle";

describe('repository/handleTitle/academicHasTitle/updateAcademicHasTitle.js', ()=>{
    test('should return a successfully message', async()=>{
        const updateAcademicHasTitleInstance = new UpdateAcademicHasTitle();
        const academicHasTitleID = 3;
        const titleID = 1;
        const titleYear = 2012;
        const {result} = await updateAcademicHasTitleInstance.updateAcademicHasTitle(academicHasTitleID,titleID, titleYear);
        expect(result.affectedRows).toBe(1);
    });
});