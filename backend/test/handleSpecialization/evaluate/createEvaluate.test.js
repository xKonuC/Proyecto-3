import { CreateEvaluate } from "../../../repository/handleSpecialization/evaluate/createEvaluate";

describe('repository/handleSpecialization/evaluate/createEvaluate.js', ()=>{
    test('should return an successfully message', async()=>{
        const projectURL = "archiveUrl";
        const formatID = 2;
        const studentHasSemesterID = 1;
        const evaluationTypeID = 1;
        const stage = 2; 
        const creationDate = "2013-12-12";
        const createEvaluateInstance = new CreateEvaluate();
        const {result} = await createEvaluateInstance.createEvaluate(projectURL, formatID, studentHasSemesterID, stage, evaluationTypeID, creationDate);
        expect(result.affectedRows).toBe(1);
    }); 
});