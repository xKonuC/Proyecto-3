import { DeleteSemester } from "../../../repository/handleSpecialization/semester/deleteSemester";

describe('repository/handleSpecialization/semester/deleteSemester.js', ()=>{
    test('should return a successfully message', async ()=>{
        const deleteSemesterInstance = new DeleteSemester();
        const semesterIDs = [1];
        const {result} = await deleteSemesterInstance.deleteSemester(semesterIDs);
        expect(result.affectedRows).toBe(1);
    });
});