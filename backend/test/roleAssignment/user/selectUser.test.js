import { SelectUser } from "../../../repository/roleAssignment/user/selectUser.js";

describe('repository/roleAssignment/user/selectUser.js', ()=>{
    test('should return an array with user', async()=>{
        const selectUserInstance = new SelectUser();
        const {response} = await selectUserInstance.selectUser();
        expect(Array.isArray(response)).toBe(true);
        if(response.length > 0){
            expect(typeof response[0].userID).toBe('number');
            expect(typeof response[0].rut).toBe('string');
            expect(typeof response[0].firstName).toBe('string');
            expect(typeof response[0].secondName).toBe('string');
            expect(typeof response[0].surname1).toBe('string');
            expect(typeof response[0].surname2).toBe('string');
            expect(typeof response[0].sex).toBe('string');
            expect(typeof response[0].civilStatus).toBe('string');
            expect(typeof response[0].birthday).toBe('object');
            expect(typeof response[0].address).toBe('string');
            expect(typeof response[0].email).toBe('string');
            expect(typeof response[0].phone).toBe('string');
            expect(typeof response[0].entry).toBe('object');
        }
    });
});