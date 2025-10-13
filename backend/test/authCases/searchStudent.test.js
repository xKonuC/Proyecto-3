import { SearchStudent } from "../../repository/authCases/searchStudent";

describe('repository/authCases/searchStudent.js',()=>{
    test('should return an student user', async ()=>{
        const searchStudentInstance = new SearchStudent();
        const result = await searchStudentInstance.searchStudent(2);
        if(result.student.length > 0){
            expect(typeof result.student[0].userID).toBe('number');
            expect(typeof result.student[0].rut).toBe('string');
            expect(typeof result.student[0].firstName).toBe('string');
            expect(typeof result.student[0].secondName).toBe('string');
            expect(typeof result.student[0].surname1).toBe('string');
            expect(typeof result.student[0].surname2).toBe('string');
            expect(typeof result.student[0].sex).toBe('string');
            expect(typeof result.student[0].civilStatus).toBe('string');
            expect(typeof result.student[0].birthday).toBe('object');
            expect(typeof result.student[0].address).toBe('string');
            expect(typeof result.student[0].email).toBe('string');
            expect(typeof result.student[0].phone).toBe('string');
            expect(typeof result.student[0].entry).toBe('object');
    }else{
            expect(result.administrative.length).toBe(0);
    }

    }, 20000);
});