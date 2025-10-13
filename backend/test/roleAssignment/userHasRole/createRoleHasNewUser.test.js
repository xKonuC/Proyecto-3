import { CreateRoleHasNewUser } from "../../../repository/roleAssignment/userHasRole/createRoleHasNewUser";

describe('repository/roleAssignment/userHasRole/createRoleHasNewUser.js', ()=>{
    test('should return a successfully message', async()=>{
        const createRoleHasNewUserInstance = new CreateRoleHasNewUser();
        const userID = 15;
        const roleID = 4;
        const result = await createRoleHasNewUserInstance.createRoleHasNewUser(userID, roleID);
        expect(typeof result.id).toBe('number');
    });
});