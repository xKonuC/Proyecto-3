import CryptoJS from 'crypto-js';

function encryptObject(payload) {
  const secretPasswordCrypto = process.env.SECRET_PASSWORD_CRYPTO;
  const iv = CryptoJS.lib.WordArray.random(16);
  const payloadString = JSON.stringify(payload);
  const encryptedData = CryptoJS.AES.encrypt(payloadString, secretPasswordCrypto, { iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 }).toString();
  const encryptedObject = {
    encryptedData: encryptedData.toString(),
    iv: iv.toString(),
  };
  return encryptedObject;
}

export default encryptObject;
