import { GetSpecializationHasUser } from "../../../repository/handleSpecialization/specializationHasUser/getSpecializationHasUser";

describe('repository/handleSpecialization/specializationHasUser/getSpecializationHasUser.js', ()=>{
    test('should return an array with studentHasSpecialization', async()=>{
        const getSpecializationHasUserInstance = new GetSpecializationHasUser();
        const userID = 2;
        const {result} = await getSpecializationHasUserInstance.getSpecializationHasUser(userID);
        expect(Array.isArray(result)).toBe(true);
    });
});