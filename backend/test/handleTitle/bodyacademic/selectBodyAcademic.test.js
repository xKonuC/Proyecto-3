import { SelectBodyAcademic } from "../../../repository/handleTitle/bodyacademic/selectBodyAcademic";

describe('repository/handleTitle/bodyAcademic/selectBodyAcademic.js', ()=>{
    test('should return an academicHasTitle information', async ()=>{
        const selectBodyAcademicInstance = new SelectBodyAcademic();
        const {result} = await selectBodyAcademicInstance.selectBodyAcademic(1);
        if(result.length > 0){
            expect(typeof result[0].academicHasTitleID).toBe('number');
            expect(typeof result[0].userID).toBe('number');
            expect(typeof result[0].titleID).toBe('number');
            expect(typeof result[0].titleYear).toBe('number');
            expect(typeof result[0].archiveURL).toBe('string');
            expect(typeof result[0].formatID).toBe('number');
            expect(typeof result[0].title).toBe('object');
            expect(typeof result[0].format).toBe('object');

        }else{
            return true;
        }
    });
});