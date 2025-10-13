import { GetUserAuth } from "../../repository/utils/getUserAuth.js";
import { AuthUser } from "../../repository/authCases/authUser.js";

describe('repository/utils/getUserAuth.js', ()=>{
    test('should return a user information with token', async () =>{
        const authUserInstance = new AuthUser();
        const {token} = await authUserInstance.authUser('olver.arce.limache@alumnos.uta.cl','Olver_123');
        const finalToken = token.split(' ')[1];
        const getUserAuthInstance = new GetUserAuth();
        const user = await getUserAuthInstance.getUserAuth(finalToken);
        expect(typeof user.id).toBe('number');
        expect(typeof user.userID).toBe('number');
        expect(typeof user.rut).toBe('string');
        expect(typeof user.firstName).toBe('string');
        expect(typeof user.secondName).toBe('string');
        expect(typeof user.surname1).toBe('string');
        expect(typeof user.surname2).toBe('string');
        expect(typeof user.sex).toBe('string');
        expect(typeof user.civilStatus).toBe('string');
        expect(typeof user.birthday).toBe('string');
        expect(typeof user.address).toBe('string');
        expect(typeof user.email).toBe('string');
        expect(typeof user.phone).toBe('string');
        expect(typeof user.entry).toBe('number');
        expect(typeof user.workPlace).toBe('object');
        expect(typeof user.phoneWork).toBe('object');
        expect(typeof user.job).toBe('object');
        expect(typeof user.articulation).toBe('number');      
    });
});