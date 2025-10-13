import { SelectDegree } from "../../../repository/handleTitle/degree/selectDegree";

describe('repository/handleTitle/degree/selectDegree.js', ()=>{
    test('should return an array with degree', async()=>{
        const selectDegreeInstance = new SelectDegree();
        const {result} = await selectDegreeInstance.selectDegree();
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].degreeID).toBe('number');
            expect(typeof result[0].name).toBe('string');
            expect(typeof result[0].type).toBe('string');
        }
    })
});