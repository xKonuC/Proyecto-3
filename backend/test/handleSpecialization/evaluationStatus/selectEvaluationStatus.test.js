import { SelectEvaluationStatus } from "../../../repository/handleSpecialization/evaluationStatus/selectEvaluationStatus";

describe('repository/handleSpecialization/evaluationStatus/selectEvaluationStatus.js', ()=>{
    test('should return an array evaluationStatus', async()=>{
        const selectEvaluationStatusInstance = new SelectEvaluationStatus();
        const evaluationStatusIDs = [3, 4, 5, 7, 8, 9];
        const {result} = await selectEvaluationStatusInstance.selectEvaluationStatus(evaluationStatusIDs);
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].evaluationStatusID).toBe('number');
            expect(typeof result[0].name).toBe('string');
            expect(typeof result[0].description).toBe('string');
        }
    });
});