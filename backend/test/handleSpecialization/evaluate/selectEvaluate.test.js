import { SelectEvaluate } from "../../../repository/handleSpecialization/evaluate/selectEvaluate";

describe('repository/handleSpecialization/evaluate/selectEvaluate.js', ()=>{
    test('should return an array evaluate', async ()=>{
        const table = 'preprojectEvaluation';
        const userID = 1;
        const studentHasSemesterID = 1;
        const stage = 1;
        const selectEvaluateInstance = new SelectEvaluate();
        const {result} = await selectEvaluateInstance.selectEvaluate(table, studentHasSemesterID, userID, stage);
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].evaluateID).toBe('number');
            expect(typeof result[0].studentHasSemesterID).toBe('number');
            expect(typeof result[0].semesterID).toBe('number');
            expect(typeof result[0].year).toBe('number');
            expect(typeof result[0].userID).toBe('number');
            expect(typeof result[0].rut).toBe('string');
        }
    });
});