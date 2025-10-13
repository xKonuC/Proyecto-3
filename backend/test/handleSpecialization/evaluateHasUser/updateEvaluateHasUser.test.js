import { UpdateEvaluateHasUser } from "../../../repository/handleSpecialization/evaluateHasUser/updateEvaluateHasUser";

describe('repository/handleSpecialization/evaluateHasUser/updateEvaluateHasUser.js', ()=>{
    test('should return an succesfully message', async()=>{
        const updateEvaluateHasUserInstance = new UpdateEvaluateHasUser();
        const data = { rubricID: 3, userID: 2, academicCategory: 1};
        const {result} = await updateEvaluateHasUserInstance.updateEvaluateHasUser(data);
        expect(result.affectedRows).toBe(1);
    }); 
});