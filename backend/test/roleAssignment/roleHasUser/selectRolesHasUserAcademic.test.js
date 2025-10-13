import { SelectRolesHasUserAcademic } from "../../../repository/roleAssignment/roleHasUser/selectRolesHasUserAcademic.js";

describe('repository/roleAssignment/roleHasUser/selectRolesHasUserAcademic.js', ()=>{
    test('should return an userHasRole array where is Academic', async()=>{
        const selectRolesHasuserAcademicInstance = new SelectRolesHasUserAcademic();
        const {result} = await selectRolesHasuserAcademicInstance.SelectRolesHasUserAcademic();
        expect(Array.isArray(result)).toBe(true);
        if( result.length > 0){
            expect(typeof result[0].userID).toBe('number');
            expect(typeof result[0].roleID).toBe('number');
            expect(typeof result[0].rut).toBe('string');
        }
    })
});