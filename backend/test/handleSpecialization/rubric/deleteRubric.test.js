import { DeleteRubric } from "../../../repository/handleSpecialization/rubric/deleteRubric";

describe('repository/handleSpecialization/rubric/deleteRubric.js', ()=>{
    test('should return a successfully message', async()=>{
        const rubricIDs = [4];
        const evaluateHasUserID = 1;
        const deleteRubricInstance = new DeleteRubric();
        const {result} = await deleteRubricInstance.deleteRubric(rubricIDs, evaluateHasUserID);
        expect(result.affectedRows).toBe(1);

    });
});