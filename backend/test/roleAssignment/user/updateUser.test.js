import { UpdateUser } from "../../../repository/roleAssignment/user/updateUser.js";

describe('repository/roleAssignment/user/updateUser.js', ()=>{
    test('should return a successfully message', async()=>{
        const updateUserInstance =new UpdateUser();
        const userID = 15;
        const rut = '20.123.234-1';
        const firstName = 'ol';
        const secondName = 'ol'; 
        const surname1 = 'ol'; 
        const surname2 = 'ol'; 
        const sex = 'M'
        const civilStatus = 'soltero';
        const birthday = '2012-12-12';
        const address = 'ol'
        const phone = '123456789';
        const workPlace = 'ol';
        const phoneWork = '123456789';
        const job = 'stud';
        const articulation = 0;
        const result = await updateUserInstance.updateUser(userID, rut, firstName, secondName, surname1, surname2, sex, civilStatus, birthday, address, phone, workPlace, phoneWork, job, articulation);
        expect(result).toBe(1);
    });
});