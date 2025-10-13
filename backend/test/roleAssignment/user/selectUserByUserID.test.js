import { SelectUserByUserID } from "../../../repository/roleAssignment/user/selectUserByUserID";

describe('repository/roleAssignment/user/selectUserByUserID.js', ()=>{
    test('should return an array with userHasRoles', async()=>{
        const selectUserByUserIDInstance = new SelectUserByUserID();
        const userID = 5;
        const result = await selectUserByUserIDInstance.selectUserByUserID(userID);
        if(result){
            expect(typeof result.userID).toBe('number');
            expect(typeof result.rut).toBe('string');
            expect(typeof result.firstName).toBe('string');
            expect(typeof result.secondName).toBe('string');
            expect(typeof result.surname1).toBe('string');
            expect(typeof result.surname2).toBe('string');
            expect(typeof result.sex).toBe('string');
            expect(typeof result.civilStatus).toBe('string');
            expect(typeof result.birthday).toBe('object');
            expect(typeof result.address).toBe('string');
            expect(typeof result.email).toBe('string');
            expect(typeof result.phone).toBe('string');
            expect(typeof result.entry).toBe('object');
        }
    });
});