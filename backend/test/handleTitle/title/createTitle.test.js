import { CreateTitle } from "../../../repository/handleTitle/title/createTitle";

describe('repository/handleTitle/title/createTitle.js', ()=>{
    test('should return a successfully message', async()=>{
        const createTitleInstance = new CreateTitle();
        const name = 'tit';
        const degreeID = 2;
        const universityID = 1;
        const departmentName = 'dep';
        const studyField = 'mat'; 
        const {result} = await createTitleInstance.createTitle(name, degreeID, universityID, departmentName, studyField);
        expect(result.affectedRows).toBe(1);
    });
});