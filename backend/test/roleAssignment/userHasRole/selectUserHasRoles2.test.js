import { SelectUserHasRoles2 } from "../../../repository/roleAssignment/userHasRole/selectUserHasRoles2";

describe('repository/roleAssignment/userHasRole/selectUserHasRole2.js',()=>{
    test('should return student array', async()=>{
        const selectUserHasRoles2Instance = new SelectUserHasRoles2();
        const {result} = await selectUserHasRoles2Instance.selectUserHasRoles2('student');
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].userID).toBe('number');
            expect(typeof result[0].rut).toBe('string');
            expect(typeof result[0].firstName).toBe('string');
            expect(typeof result[0].secondName).toBe('string');
            expect(typeof result[0].surname1).toBe('string');
            expect(typeof result[0].surname2).toBe('string');
        }
    });
    test('should return academic array', async()=>{
        const selectUserHasRoles2Instance = new SelectUserHasRoles2();
        const {result} = await selectUserHasRoles2Instance.selectUserHasRoles2('academic');
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].userID).toBe('number');
            expect(typeof result[0].rut).toBe('string');
            expect(typeof result[0].firstName).toBe('string');
            expect(typeof result[0].secondName).toBe('string');
            expect(typeof result[0].surname1).toBe('string');
            expect(typeof result[0].surname2).toBe('string');
        }
    });
});