import { UpdateRubric } from "../../../repository/handleSpecialization/rubric/updateRubric";

describe('repository/handleSpecialization/rubric/updateRubric.js', ()=>{
    test('should return a successfully message', async()=>{
        const updateRubricInstance = new UpdateRubric();
        const rubricID = 2;
        const description = "description"; 
        const rubricName = "rubricName";
        const comment = "comment";
        const evaluateHasUserID = 2;
        const {result} = await updateRubricInstance.updateRubric(rubricID, description, rubricName, comment, evaluateHasUserID);
        expect(result.affectedRows).toBe(1);
    });
});