import cryptojs from "crypto-js";


const dencrypt = (decoded) => {
    try {
        const secret = process.env.SECRET_ENCRYPT;
        const bytes = cryptojs.AES.decrypt(decoded.encryptedData, secret, { iv: decoded.iv, mode: cryptojs.mode.CBC, padding: cryptojs.pad.Pkcs7 });
        const decryptedData = bytes.toString(cryptojs.enc.Utf8);
        const decryptedObject = JSON.parse(decryptedData);

        return decryptedObject;
    } catch (error) {
        console.log("dencrypt error");
        res.json({ message: "Error de dencriptación" });
    }
}

export default dencrypt;
