import { CreateUserHasRole } from "../../../repository/roleAssignment/userHasRole/createUserHasRole";

describe('repository/roleAssignment/userHasRole/createUserHasRole.js', ()=>{
    test('should return a succesfully message', async()=>{
        const createUserHasRoleInstance = new CreateUserHasRole();
        const userID = 4;
        const roleID = 4;
        const {result} = await createUserHasRoleInstance.createUserHasRole(userID, roleID);
        expect(result.affectedRows).toBe(1);
    }); 
});