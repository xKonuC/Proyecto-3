import { SelectStatus } from "../../../repository/handleSpecialization/status/selectStatus.js";

describe('repository/handleSpecialization/status/selectStatus.js',()=>{
    test('return an array of statusEvaluation', async()=>{
        const selectStatusInstance = new SelectStatus();
        const statusIDs = [1, 2, 3, 4, 5];
        const {result} = await selectStatusInstance.selectStatus(statusIDs);
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].evaluationStatusID).toBe('number');
            expect(typeof result[0].name).toBe('string');
            expect(typeof result[0].description).toBe('string');
        }
    });
});