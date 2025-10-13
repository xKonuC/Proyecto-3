import { SelectUniversity } from "../../../repository/handleTitle/university/selectUniversity";

describe('repository/handleTitle/university/selectUniversity.js', ()=>{
    test('should return an array with university', async()=>{
        const selectUniversityInstance = new SelectUniversity();
        const {result} = await selectUniversityInstance.selectUniversity();
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].universityID).toBe('number');
            expect(typeof result[0].name).toBe('string');
            expect(typeof result[0].city).toBe('string');
            expect(typeof result[0].country).toBe('string');
        }
    });
});