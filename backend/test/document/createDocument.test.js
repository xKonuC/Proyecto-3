import { CreateDocument } from "../../repository/document/createDocument";

describe('repository/document/createDocument.js', ()=>{
    test('should return a successfully message', async()=>{
        const createDocumentInstance = new CreateDocument();
        const archiveURL = '1709247460698-Arquitectura.drawio.png.enc';
        const userID = 2;
        const formatID = 2;
        const category = 'cat';
        const {result} = await createDocumentInstance.createDocument(archiveURL, userID, formatID, category);
        expect(result.affectedRows).toBe(1);

    });
});