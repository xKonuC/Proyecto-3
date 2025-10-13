import { CreateAcademicHasTitle } from "../../../repository/handleTitle/academicHasTitle/createAcademicHasTitle";

describe('repository/handleTitle/academicHasTitle/createAcademicHasTitle.js', ()=>{
    test('should return a successfully message', async()=>{
        const createAcademicHasTitleInstance = new CreateAcademicHasTitle();
        const archiveURL = 'url';
        const userID = 2;
        const titleID = 2;
        const formatID = 2;
        const titleYear = 2012
        const {result} = await createAcademicHasTitleInstance.createAcademicHasTitle(archiveURL, userID, titleID, formatID,titleYear);
        expect(result.affectedRows).toBe(1);
    });
});