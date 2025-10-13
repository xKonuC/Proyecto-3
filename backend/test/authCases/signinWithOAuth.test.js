import { SignInWithOAuth } from "../../repository/authCases/signinWithOAuth";

describe('repository/authCases/signinWithOAuth.js', ()=>{
    test('should return an administrative url',  async ()=>{
        const signInWithOAuthInstance = new SignInWithOAuth();
        const {url} = await signInWithOAuthInstance.signInWithOAuth(true);
        expect(url).toBe('https://postgrado.educ.uta.cl/auth/google/administrative');
    });
    test('should return an general url', async ()=>{
        const signInWithOAuthInstance = new SignInWithOAuth();
        const {url} = await signInWithOAuthInstance.signInWithOAuth(false);
        expect(url).toBe('https://postgrado.educ.uta.cl/auth/google');
    });

});