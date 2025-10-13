import { DeleteStorage4 } from "../../repository/storage/deleteStorage4.js";

describe('repository/storage/deleteStorage4.js', ()=>{
    test(' should return a successfully message', async()=>{
        const deleteStorage4Instance = new DeleteStorage4();
        const url = '1713286092573-Screenshot_1.png.enc';
        const result = await deleteStorage4Instance.deleteStorage4(url);   
        expect(result.message).toBe('File deleted');
    }, 10000);
    test(' should return a error message', async()=>{
        const deleteStorage4Instance = new DeleteStorage4();
        const url = '1709046195840-Arquitectura.drawio.png.enc';
        const result = await deleteStorage4Instance.deleteStorage4(url);   
        expect(result.message).toBe('Error deletting file');
    });

});