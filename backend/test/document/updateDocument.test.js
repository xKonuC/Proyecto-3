import { UpdateDocument } from "../../repository/document/updateDocument";

describe('repository/document/updateDocument.js', ()=>{
    test('should return a successfully message', async()=>{
        const updateDocumentInstance = new UpdateDocument();
        const documentID = '2';
        const category = 'cv';
        const {result} = await updateDocumentInstance.updateDocument(documentID, category);
        expect(result.affectedRows).toBe(1);
    });
});