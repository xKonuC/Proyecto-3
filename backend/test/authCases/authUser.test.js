import { AuthUser} from '../../repository/authCases/authUser.js';

describe('repository/authCases/authUser.js', ()=>{

    test('autentication should return credentials', async ()=>{
        const email = "olver.arce.limache@alumnos.uta.cl";
        const password = "Olver_123";
        const authUserInstance = new AuthUser()
        const credentials = await authUserInstance.authUser(email, password);
        expect(typeof credentials.message).toBe('string');
        expect(typeof credentials.token).toBe('string');
        expect(typeof credentials.id).toBe('number');
    });
    test('invalid credential should return Incorrect password', async ()=>{
        const email = "olver.arce.limache@alumnos.uta.cl";
        const password = "Olver_12";
        const authUserInstance = new AuthUser()
        const credentials = await authUserInstance.authUser(email, password);
        expect(credentials.message).toBe('Incorrect password');
    });
});