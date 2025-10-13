import { SelectTitleHasUniversity } from "../../../repository/handleTitle/title/selectTitleHasUniversity";

describe('repository/handleTitle/title/selectTitleHasUniversity.js', ()=>{
    test('should return an array with titleHasUniversity', async()=>{
        const selectTitleHasUniversityInstance = new SelectTitleHasUniversity();
        const {result} = await selectTitleHasUniversityInstance.selectTitleHasUniversity();
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].titleID).toBe('number');
            expect(typeof result[0].universityID).toBe('number');
            expect(typeof result[0].degreeID).toBe('number');
            expect(typeof result[0].name).toBe('string');
            expect(typeof result[0].studyField).toBe('string');
            expect(typeof result[0].universityName).toBe('string');
            expect(typeof result[0].country).toBe('string');
            expect(typeof result[0].city).toBe('string');
            expect(typeof result[0].degree).toBe('string');
            expect(typeof result[0].type).toBe('string');
        }
    });
});