import { CreateStudentHasTitle } from "../../../repository/handleTitle/studentHasTitle/createStudentHasTitle";

describe('repository/handleTitle/studentHasTitle/createStudentHasTitle.js', ()=>{
    test('should return a successfully message', async()=>{
        const createStudentHasTitleInstance = new CreateStudentHasTitle();
        const archiveURL = '1709258298567-Arquitectura.drawio.png.enc'
        const userID = 2;
        const titleID = 2 
        const formatID = 2;
        const titleYear = 2012;
        const {result} = await createStudentHasTitleInstance.createStudentHasTitle(archiveURL,userID,titleID,formatID,titleYear);
        expect(result.affectedRows).toBe(1);
    });
});