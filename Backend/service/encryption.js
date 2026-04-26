import crypto from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = process.env.SECRET_KEY || 'default_secret_key_32_chars_long!';
const IV_LENGTH = 16;

const getKey = () => {
    return crypto.createHash('sha256').update(String(SECRET_KEY)).digest();
};

export const encryptObject = (payload) => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, getKey(), iv);
    const encrypted = Buffer.concat([cipher.update(JSON.stringify(payload), 'utf8'), cipher.final()]);
    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
};

export const decryptObject = (payload) => {
    const [ivHex, encryptedHex] = payload.split(':');
    if (!ivHex || !encryptedHex) {
        throw new Error('Invalid encrypted payload format');
    }
    const iv = Buffer.from(ivHex, 'hex');
    const encryptedText = Buffer.from(encryptedHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, getKey(), iv);
    const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
    return JSON.parse(decrypted.toString('utf8'));
};

export const createETag = (payload) => {
    return crypto.createHash('sha256').update(JSON.stringify(payload)).digest('hex');
};