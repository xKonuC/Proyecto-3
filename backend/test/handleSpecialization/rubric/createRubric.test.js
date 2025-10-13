import { CreateRubric } from "../../../repository/handleSpecialization/rubric/createRubric.js";

describe('repository/handleSpecializationi/rubric/createRubric.js', ()=>{
    test('should return a successfully message', async()=>{
        const description = "d";
        const rubricName = "d";
        const comment = "d";
        const evaluateHasUserID = 1;
        const evaluateID = 1; 
        const evaluatorCategory = 'Director';
        const createRubricInstance = new CreateRubric();
        const {result} = await createRubricInstance.createRubric(description,rubricName,comment,evaluateHasUserID, evaluateID, evaluatorCategory);
        expect(result.affectedRows).toBe(1);
    }); 
});