import { VerifySpecializationHasStudent } from "../../../repository/handleSpecialization/specializationEvaluationAcademics/verifySpecializationHasStudent.js";
import getTypeEvaluation from "../../../utils/getTypeEvaluation.js";

describe('repository/handleSpecialization/specializationEvaluationAcademics/verifySpecializationHasStudent.js',()=>{
    test('should return an array', async()=>{
        const verifySpecializationHasStudentInstance = new VerifySpecializationHasStudent();
        const tabla = getTypeEvaluation(2);
        const userID = 1;
        const result = await verifySpecializationHasStudentInstance.verifySpecializationHasStudent(tabla, userID);
        expect(Array.isArray(result)).toBe(true);
    });
});