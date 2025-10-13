import { CreateSemester } from "../../../repository/handleSpecialization/semester/createSemester";

describe('repository/handleSpecialization/semester/createSemester.js', ()=>{
    test('should return a successfully message', async ()=>{
        const createSemesterInstance = new CreateSemester();
        const semesterNumber = 1;
        const year = 2024;
        const startDate = '2030-01-01T10:10:10Z'
        const finishDate = '2030-01-01T10:10:10Z';
        const {result} = await createSemesterInstance.createSemester(semesterNumber, year, startDate, finishDate);
        expect(result.affectedRows).toBe(1);
    });
});