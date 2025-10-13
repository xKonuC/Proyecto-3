import { ApprovalSpecialization } from "../../../repository/handleSpecialization/specializationHasUser/approvalSpecialization";

describe('repository/handleSpecialization/specializationHasUser/approvalSpecialization.js', ()=>{
    test('should return an successfully message', async()=>{
        const approvalSpecializationInstance = new ApprovalSpecialization();
        const userID =1; 
        const specializationHasUserID = 2; 
        const statusID = 1;
        const completionSemester = 2;
        const {result} = await approvalSpecializationInstance.approvalSpecialization(userID, specializationHasUserID, statusID, completionSemester);
        expect(result.affectedRows).toBe(1);
    });
});