import { SelectRolesHasUserDirector } from "../../../repository/roleAssignment/roleHasUser/selectRolesHasUserDirector";

describe('repository/roleAssignment/roleHasUser/selectRolesHasUserDirector.js', ()=>{
    test('should return an array userHasRole where is Director', async ()=>{
        const selectRolesHasUserDirectorInstance = new SelectRolesHasUserDirector();
        const {result} = await selectRolesHasUserDirectorInstance.selectRolesHasUserDirector();
        expect(Array.isArray(result)).toBe(true);
        if(result > 0){
            expect(typeof result[0].userID).toBe('number');
            expect(typeof result[0].roleID).toBe('number');
            expect(typeof result[0].name).toBe('string');
        }
    });
});