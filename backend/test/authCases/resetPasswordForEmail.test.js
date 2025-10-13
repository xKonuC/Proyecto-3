import { ResetPasswordForEmail } from "../../repository/authCases/resetPasswordForEmail.js";

describe('repository/authCases/resetPasswordForEmail.js',  ()=>{
    test(' valid email show return invitation', async ()=>{
        const resetPasswordForEmailInstance = new ResetPasswordForEmail();
        const result = await resetPasswordForEmailInstance.resetPasswordForEmail('olver.arce.limache@alumnos.uta.cl')
        expect(typeof result.message).toBe('string');
        expect(result.accepted[0]).toBe('olver.arce.limache@alumnos.uta.cl');
    }, 10000); 
    test('invalid email show return user not founded', async ()=>{
        const resetPasswordForEmailInstance = new ResetPasswordForEmail();
        const result = await resetPasswordForEmailInstance.resetPasswordForEmail('olvera.arce.limache@alumnos.uta.cl')
        expect(result.message).toBe('User not founded.');
    }, 10000); 

});