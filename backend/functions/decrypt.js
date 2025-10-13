import crypto from 'crypto-js';

const decrypt = (decoded) => {
  try {
    const secret = process.env.SECRET_ENCRYPT;
    const bytes = crypto.AES.decrypt(decoded.encryptedData, secret, { iv: decoded.iv, mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7 });
    const decryptedData = bytes.toString(crypto.enc.Utf8);
    const decryptedObject = JSON.parse(decryptedData);

    return decryptedObject;
  } catch (error) {
    console.log(error);
  }
};

export default decrypt;
