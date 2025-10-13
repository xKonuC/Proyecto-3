import { AuthUser } from "../../repository/authCases/authUser.js";
import { RefreshSession } from '../../repository/authCases/refreshSession.js';

describe('repository/authCases/refreshSession.js',()=>{
    test('refresh should return a new token', async ()=>{
        const authUserInstance = new AuthUser();
        const  credentials = await authUserInstance.authUser('olver.arce.limache@alumnos.uta.cl', 'Olver_123');
        const refreshToken = credentials.refreshToken.split(' ')[1];

        const refreshSessionInstance = new RefreshSession();
        const newToken = await refreshSessionInstance.refreshSession(refreshToken);
        expect(newToken.message).toBe('updated token');
        expect(typeof newToken.token).toBe('string');
        expect(typeof newToken.refreshToken).toBe('string'); 
        expect(typeof newToken.id).toBe('number');
        
    });
    test('use invalid token should return an error', async ()=>{
        const refreshSessionInstance = new RefreshSession();
        const newToken = await refreshSessionInstance.refreshSession('');
        expect(newToken.message).toBe('Error al verificar el refresh token: jwt must be provided');
    });
});