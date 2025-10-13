import { CreateUser } from "../../../repository/roleAssignment/user/createUser";

describe('repository/roleAssignment/user/createUser.js', ()=>{
    test('should return an successfully message', async()=>{
        const rut = '20.901.445-1';
        const firstName = 'ol';
        const secondName = 'ol'; 
        const surname1 = 'ol'; 
        const surname2 = 'ol'; 
        const sex = 'M'
        const civilStatus = 'soltero';
        const birthday = '2012-12-12';
        const address = 'ol'
        const email = 'olverarce04@gmail.com';
        const phone = '123456789';
        const workPlace = 'ol';
        const phoneWork = '123456789';
        const job = 'stud';
        const entry = 2012;
        const group = 1;
        const articulation = 0;
        const createUserInstance = new CreateUser();

        const result = await createUserInstance.createUser(rut,firstName,secondName,surname1,surname2,sex,civilStatus,birthday,address,email,phone,workPlace,phoneWork,job,entry,articulation,group);
        expect(typeof result.id).toBe('number');
    }, 40000);
});