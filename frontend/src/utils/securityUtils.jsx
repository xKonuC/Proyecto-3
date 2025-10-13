import CryptoJS, { enc } from 'crypto-js';
import { VerifyData } from './securityHelpers/verifyData';
import { SignData } from './securityHelpers/signData';

export function encryptData(data) {
    const key = import.meta.env.VITE_KEY;
    const iv = CryptoJS.lib.WordArray.random(16);
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), key, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
    return { encryptedData: encryptedData.toString(), iv: iv.toString() };
}

export function decryptData(encryptedData, iv, secretKey) {
    try {
        const key = secretKey || import.meta.env.VITE_KEY;
        const bytes = CryptoJS.AES.decrypt(encryptedData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
        const decryptedData = bytes.toString(CryptoJS.enc.Utf8);
        return JSON.parse(decryptedData);
    } catch (e) {
        throw e;
    }
}

export function signData(payload) {
    const signData = new SignData();
    return signData.signData(payload);
}

export function verifyData(token) {
    const verifyData = new VerifyData();
    return verifyData.verifyData(token);
}
