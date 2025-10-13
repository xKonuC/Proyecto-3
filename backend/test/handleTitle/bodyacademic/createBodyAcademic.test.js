import { CreateBodyAcademic } from "../../../repository/handleTitle/bodyacademic/createBodyAcademic";

describe('repository/handleTitle/bodyAcademic/createBodyAcademic.js', ()=>{
    test('should return an succesfully message', async()=>{
        const createBodyAcademicInstance = new CreateBodyAcademic();
        const message = await createBodyAcademicInstance.createBodyAcademic("1709213962839-Arquitectura.drawio.png.enc", 1, 1, 1, 2013);
        expect(message.result.affectedRows).toBe(1);
    });
});