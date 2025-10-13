import { VerifyStatus } from "../../../repository/handleSpecialization/specializationHasUser/verifyStatus";

describe('repository/handleSpecialization/specializationHasUser/verifyStatus.js', ()=>{
    test('should return an array with studentHasSpecialization', async()=>{
        const verifyStatusInstance = new VerifyStatus();
        const userID = 2;
        const specializationHasUserID = 2;
        const statusID = 8;
        const {result} = await verifyStatusInstance.verifyStatus(userID, specializationHasUserID, statusID);
        expect(Array.isArray(result)).toBe(true);
    });
});