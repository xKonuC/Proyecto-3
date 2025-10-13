import { GetEvaluate } from "../../../repository/handleSpecialization/evaluate/getEvaluate";

describe('repository/handleSpecialization/evaluate/getEvaluate.js', ()=>{
    test('should return an evaluate array', async()=>{
        const getEvaluateInstance = new GetEvaluate();
        const studentHasSemesterID = 2;
        const stage = 1;
        const {result} = await getEvaluateInstance.getEvaluate(studentHasSemesterID, stage);
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].evaluateID).toBe('number');
            expect(typeof result[0].studentHasSemesterID).toBe('number');
            expect(typeof result[0].evaluationStatusID).toBe('number');
            expect(typeof result[0].evaluationTypeID).toBe('number');
            expect(typeof result[0].stage).toBe('number');
            expect(typeof result[0].projectURL).toBe('string');
            expect(typeof result[0].formatID).toBe('number');
            expect(typeof result[0].creationDate).toBe('object');
        }
    });
});