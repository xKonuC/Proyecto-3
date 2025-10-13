import { DeleteUserHasRole } from "../../../repository/roleAssignment/userHasRole/deleteUserHasRole";

describe('repository/roleAssignment/userHasRole/deleteUserHasRole.js', ()=>{
    test('should return a successfully message', async()=>{
        const deleteUserHasRoleInstance = new DeleteUserHasRole();
        const userID = 4;
        const roleID = 4;
        const {result} = await deleteUserHasRoleInstance.deleteUserHasRole(userID, roleID);
        expect(result.affectedRows).toBe(1);
    });
});