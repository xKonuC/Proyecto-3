import { GetProjectURL } from "../../../repository/handleSpecialization/evaluate/getProjectURL.js";

describe('repository/handleSpecialization/evaluate/getProjectURL.js', ()=>{
    test('should return an url', async()=>{
        const evaluateID = 1;
        const studentHasSemesterID = 1;
        const getProjectURLInstance = new GetProjectURL();
        const result = await getProjectURLInstance.getProjectURL(evaluateID, studentHasSemesterID);
        expect(typeof result).toBe('string');
    });
});