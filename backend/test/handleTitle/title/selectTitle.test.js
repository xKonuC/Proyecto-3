import { SelectTitle } from "../../../repository/handleTitle/title/selectTitle";

describe('repository/handleTitle/title/selectTitle.js', ()=>{
    test('should return an array with titles', async()=>{
        const selectTitleInstance = new SelectTitle();
        const {result} = await selectTitleInstance.selectTitle();
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].titleID).toBe('number');
            expect(typeof result[0].universityID).toBe('number');
            expect(typeof result[0].degreeID).toBe('number');
            expect(typeof result[0].name).toBe('string');
            expect(typeof result[0].studyField).toBe('string');
        }
    });
});