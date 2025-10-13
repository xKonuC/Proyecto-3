import { SelectUserHasRolesDirector } from "../../../repository/roleAssignment/userHasRole/selectUserHasRolesDirector";

describe('repository/roleAssignment/userHasRole/selectUserHasRolesDirector.js', ()=>{
    test('should return an array with director', async()=>{
        const selectUserHasRolesDirectorInstance = new SelectUserHasRolesDirector();
        const {result} = await selectUserHasRolesDirectorInstance.selectUserHasRolesDirector();
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].userID).toBe('number');
            expect(typeof result[0].roleID).toBe('number');
            expect(typeof result[0].name).toBe('string');
            expect(typeof result[0].rut).toBe('string');
            expect(typeof result[0].firstName).toBe('string');
            expect(typeof result[0].secondName).toBe('string');
            expect(typeof result[0].surname1).toBe('string');
            expect(typeof result[0].surname2).toBe('string');
            expect(typeof result[0].sex).toBe('string');
            expect(typeof result[0].civilStatus).toBe('string');
            expect(typeof result[0].birthday).toBe('object');
            expect(typeof result[0].address).toBe('string');
            expect(typeof result[0].email).toBe('string');
            expect(typeof result[0].phone).toBe('string');
            expect(typeof result[0].entry).toBe('object');
        }
    });
});