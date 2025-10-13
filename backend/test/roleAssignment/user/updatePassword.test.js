import { UpdatePassword } from "../../../repository/roleAssignment/user/updatePassword";

describe('repository/roleAssignment/user/updatePassword.js', ()=>{
    test('with valid user should return a succesfully message', async ()=>{
        const updatePasswordInstance = new UpdatePassword();
        const result = await updatePasswordInstance.updatePassword(1,'Olver_123');
        expect(result.message).toBe('Password added');
    });
});