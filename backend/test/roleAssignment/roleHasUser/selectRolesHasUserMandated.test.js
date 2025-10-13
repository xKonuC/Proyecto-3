import { SelectRolesHasUserAdministrator } from "../../../repository/roleAssignment/roleHasUser/selectRolesHasUserAdministrator";

describe('repository/roleAssignment/roleHasUser/selectRolesHasUserAdministrator.js', ()=>{
    test('should retunr an array userHasRole where is Administrator', async()=>{
        const selectRolesHasUserAdministratorInstance = new SelectRolesHasUserAdministrator();
        const {result} = await selectRolesHasUserAdministratorInstance.selectRolesHasUserAdministrator();
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].userID).toBe('number');
            expect(typeof result[0].roleID).toBe('number');
            expect(typeof result[0].name).toBe('string');
        }
    });
});