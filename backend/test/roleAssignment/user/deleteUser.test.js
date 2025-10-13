import { DeleteUser } from "../../../repository/roleAssignment/user/deleteUser";

describe('repository/roleAssignment/user/deleteUser.js', ()=>{
    test('should return a successfully message', async()=>{
        const deleteUserInstance = new DeleteUser();
        const userID = 15;
        const result = await deleteUserInstance.deleteUser(userID);
        expect(result.message).toBe('User deleted successfully');
    });
});