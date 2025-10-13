import { UpdateTitle } from "../../../repository/handleTitle/title/updateTitle";

describe('repository/handleTitle/title/updateTitle.js', ()=>{
    test('should return a successfully message', async()=>{
        const updateTitleInstance = new UpdateTitle();
        const titleID = 2;
        const name = 'na';
        const degreeID = 2;
        const universityID = 1;
        const departmentName = 'dep';
        const studyField = 'bio';
        const {result} = await updateTitleInstance.updateTitle(titleID, name, degreeID, universityID, departmentName, studyField);
        expect(result.affectedRows).toBe(1);
    });
});