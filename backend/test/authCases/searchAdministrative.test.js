import { SearchAdministrative } from "../../repository/authCases/searchAdministrative.js";

describe('repository/authCases/searchAdministrative.js', ()=>{
    test('should return an list of administrative user', async ()=>{
        const searchAdministrativeInstance = new SearchAdministrative();
        const id = 1;
        const result = await searchAdministrativeInstance.searchAdministrative(id);
        if(result.administrative.length > 0){
                expect(typeof result.administrative[0].userID).toBe('number');
                expect(typeof result.administrative[0].rut).toBe('string');
                expect(typeof result.administrative[0].firstName).toBe('string');
                expect(typeof result.administrative[0].secondName).toBe('string');
                expect(typeof result.administrative[0].surname1).toBe('string');
                expect(typeof result.administrative[0].surname2).toBe('string');
                expect(typeof result.administrative[0].sex).toBe('string');
                expect(typeof result.administrative[0].civilStatus).toBe('string');
                expect(typeof result.administrative[0].birthday).toBe('object');
                expect(typeof result.administrative[0].address).toBe('string');
                expect(typeof result.administrative[0].email).toBe('string');
                expect(typeof result.administrative[0].phone).toBe('string');
                expect(typeof result.administrative[0].entry).toBe('object');
                expect(typeof result.administrative[0].role).toBe('string');
        }else{
                expect(result.administrative.length).toBe(0);
        }
    }, 20000);
});