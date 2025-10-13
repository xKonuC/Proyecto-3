import { UpdateEmail } from "../../../repository/roleAssignment/user/updateEmail";

describe('repository/roleAssignment/user/updateEmail.js', ()=>{
    test('should return a successfully message', async()=>{
        const updateEmailInstance = new UpdateEmail();
        const id = 4;
        const email = 'bryan.godoy.aran@alumnos.uta.cl';
        const result = await updateEmailInstance.updateEmail(id, email);
        expect(result.message).toBe('Email updated successfully');
    });
});