import { GetStudentHasSpecialization } from "../../../repository/handleSpecialization/studentHasSpecialization/getStudentHasSpecialization";

describe('repository/handleSpecialization/studentHasSpecialization/getStudentHasSpecialization.js',()=>{
    test(' should return an array specializations', async()=>{
        const getStudentHasSpecializationInstance = new GetStudentHasSpecialization();
        const userID = 4;
        const {result} = await getStudentHasSpecializationInstance.getStudentHasSpecialization(userID);
        expect(Array.isArray(result)).toBe(true);
    });
});