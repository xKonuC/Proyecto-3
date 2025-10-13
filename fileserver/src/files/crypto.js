import crypto from "crypto";

function encrypt(buffer) {
    const secretKey = process.env.SECRET_KEY;
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    const encryptedBuffer = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return Buffer.concat([iv, encryptedBuffer]);
}

function decrypt(buffer) {
    const secretKey = process.env.SECRET_KEY;
    const readIv = buffer.slice(0, 16);
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), readIv);
    const decryptedBuffer = Buffer.concat([decipher.update(buffer.slice(16)), decipher.final()]);
    return decryptedBuffer;
}
export { encrypt, decrypt };
