import crypto from "crypto-js";

const encrypt = (payload) => {
    const secret = process.env.SECRET_ENCRYPT;
    const iv = crypto.lib.WordArray.random(16);
    const payloadString = JSON.stringify(payload);
    const encryptedData = crypto.AES.encrypt(payloadString, secret, { iv, mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7 }).toString();
    const encryptedObject = {
        encryptedData: encryptedData.toString(),
        iv: iv.toString(),
    };
    return encryptedObject;
};

export default encrypt;