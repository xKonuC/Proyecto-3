import { SelectRubric } from "../../../repository/handleSpecialization/rubric/selectRubric";

describe('repository/handleSpecialization/rubric/selectRubric.js', ()=>{
    test('should return an array rubrics', async()=>{
        const selectRubricInstance = new SelectRubric();
        const evaluateHasUserID = 1;
        const evaluateID = 1;
        const {result} = await selectRubricInstance.selectRubric(evaluateHasUserID, evaluateID);
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].rubricID).toBe('number');
            expect(typeof result[0].evaluateID).toBe('number');
            expect(typeof result[0].evaluationStatusID).toBe('number');
            expect(typeof result[0].userID).toBe('number');
            expect(typeof result[0].evaluatorCategory).toBe('string');
            expect(typeof result[0].name).toBe('string');
            expect(typeof result[0].description).toBe('string');
            expect(typeof result[0].comment).toBe('string');
        }
    }); 
});