import { GetRole } from "../../../repository/utils/getRole";

describe('repository/roleAssignment/userHasRole/getRole.js', ()=>{
    test('should return an array with role', async()=>{
        const getRoleInstance = new GetRole();
        const result = await getRoleInstance.getRole();
        expect(result.Director).toBe(1);
        expect(result.Encargado).toBe(2);
        expect(result['AcadÃ©mico']).toBe(3);
        expect(result.Estudiante).toBe(4);
    });
});