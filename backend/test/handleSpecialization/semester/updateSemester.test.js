import { UpdateSemester } from "../../../repository/handleSpecialization/semester/updateSemester";

describe('repository/handleSpecialization/semester/updateSemester.js', ()=>{
    test('should return a successfully message', async()=>{
        const updateSemesterInstance = new UpdateSemester();
        const semesterID = 2;
        const semesterNumber = 2;
        const year = 2000;
        const startDate = '2000-02-07 15:30:00Z';
        const finishDate = '2000-02-07 15:30:00Z';
        const {result} = await updateSemesterInstance.updateSemester(semesterID, semesterNumber, year, startDate, finishDate);
        expect(result.affectedRows).toBe(1);
    });
});