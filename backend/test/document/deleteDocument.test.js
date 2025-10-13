import { DeleteDocument } from "../../repository/document/deleteDocument";

describe('repository/document/deleteDocument.js', ()=>{
    test('should return a succesfully message', async()=>{
        const deleteDocumentInstance = new DeleteDocument();
        const documentsID = [6];
        const {result} = await deleteDocumentInstance.deleteDocument(documentsID);
        expect(result.affectedRows).toBe(1);
    });
});