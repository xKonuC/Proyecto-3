import { SelectEvaluation } from "../../../repository/handleSpecialization/evaluation/selectEvaluation";

describe('repository/handleSpecialization/evaluation/selectEvaluation.js',()=>{
    test('should return an array with specialization', async()=>{
        const selectEvaluationInstance = new SelectEvaluation();
        const typeEvaluateID = 2;
        const stage = 1;
        const {result} = await selectEvaluationInstance.selectEvaluation(typeEvaluateID, stage);
        expect(Array.isArray(result)).toBe(true);
        if(result.length > 0){
            expect(typeof result[0].studentHasSemesterID).toBe('number');
            expect(typeof result[0].semesterID).toBe('number');
            expect(typeof result[0].year).toBe('number');
            expect(typeof result[0].semesterNumber).toBe('number');
            expect(typeof result[0].startDate).toBe('object');
            expect(typeof result[0].finishDate).toBe('object');
            expect(typeof result[0].semester_statusID).toBe('number');
            expect(typeof result[0].semester_status).toBe('string');
            expect(typeof result[0].semester_statusDescription).toBe('string');
            expect(typeof result[0].userID).toBe('number');
        }
    });
});