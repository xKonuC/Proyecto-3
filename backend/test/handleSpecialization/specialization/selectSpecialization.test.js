import { SelectSpecialization } from "../../../repository/handleSpecialization/specialization/selectSpecialization";

describe('repository/handleSpecialization/specialization/selectSpecialization.js', ()=>{
    test('should return an array with specialization', async()=>{
        const selectSpecializationInstance = new SelectSpecialization();
        const {result} = await selectSpecializationInstance.selectSpecialization();
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].specializationID).toBe('number');
            expect(typeof result[0].name).toBe('string');
        }
    });
});