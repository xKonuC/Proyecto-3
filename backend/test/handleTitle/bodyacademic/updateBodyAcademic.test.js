import { UpdateBodyAcademic } from "../../../repository/handleTitle/bodyacademic/updateBodyAcademic.js";

describe('repository/handleTitle/bodyAcademic/updateBodyAcademic.js', ()=>{
    test('should return a successfully message', async ()=>{
        const academicHasTitleID = 3;
        const titleID = 1;
        const titleYear = 2025;
        const updateBodyAcademicInstance = new UpdateBodyAcademic();
        const {result} = await updateBodyAcademicInstance.updateBodyAcademic(academicHasTitleID, titleID, titleYear);
        expect(result.affectedRows).toBe(1);
    });
});