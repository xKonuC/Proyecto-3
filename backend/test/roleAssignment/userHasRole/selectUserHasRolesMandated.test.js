import { SelectUserHasRolesAdministrator } from "../../../repository/roleAssignment/userHasRole/selectUserHasRolesAdministrator";

describe('repository/roleAssignment/userHasRole/selectUserHasRolesAdministrator.js',( )=>{
    test('should return an array with administrator', async()=>{
    const selectUserHasRolesAdministratorInstance = new SelectUserHasRolesAdministrator();
    const {result} = await selectUserHasRolesAdministratorInstance.selectUserHasRolesAdministrator();
    expect(Array.isArray(result)).toBe(true);
    if(result.length > 0){
        expect(typeof result[0].userID).toBe('number');
        expect(typeof result[0].roleID).toBe('number');
        expect(typeof result[0].name).toBe('string');
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

    })
});