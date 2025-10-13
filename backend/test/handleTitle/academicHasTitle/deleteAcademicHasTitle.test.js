import { DeleteAcademicHasTitle } from "../../../repository/handleTitle/academicHasTitle/deleteAcademicHasTitle";

describe('repository/handleTitle/academicHasTitle/deleteAcademicHasTitle.js', ()=>{
    test('should return a successfully message', async()=>{
        const deleteAcademicHasTitleInstance = new DeleteAcademicHasTitle();
        const academicHasTitleIDs = [8];
        const {result} = await deleteAcademicHasTitleInstance.deleteAcademicHasTitle(academicHasTitleIDs);
        expect(result.affectedRows).toBe(1);
    });
});