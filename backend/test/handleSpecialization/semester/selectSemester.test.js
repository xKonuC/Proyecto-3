import { SelectSemester } from "../../../repository/handleSpecialization/semester/selectSemester.js";

describe('repository/handleSpecialization/semester/selectSemester.js', ()=>{
    test('should return an array with semester', async()=>{
        const selectSemesterInstance = new SelectSemester();
        const {result} = await selectSemesterInstance.selectSemester();
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].semesterID).toBe('number');
            expect(typeof result[0].year).toBe('number');
            expect(typeof result[0].semesterNumber).toBe('number');
        }
    });
});