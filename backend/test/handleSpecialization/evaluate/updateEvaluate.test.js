import { UpdateEvaluate } from "../../../repository/handleSpecialization/evaluate/updateEvaluate.js";

describe('repository/handleSpecialization/evaluate/updateEvaluate.js', ()=>{
    test('should return a successfully message', async()=>{
        const evaluateID = 1;
        const projectURL = 'adrchiveUrl';
        const formatID = 1; 
        const updateDate = "2012-12-12";
        const updateEvaluateInstance = new UpdateEvaluate();
        const result = await updateEvaluateInstance.updateEvaluate(evaluateID, projectURL, formatID, updateDate);
        expect(result.result.affectedRows).toBe(1);
    });
});