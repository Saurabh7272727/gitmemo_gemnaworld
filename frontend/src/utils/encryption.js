import CryptoJS from 'crypto-js';

const getSecret = (secret) => secret || import.meta.env.VITE_APP_SECRET_KEY || 'default_secret_key_32_chars_long!';
const IV_LENGTH_BYTES = 16;

const getKey = (secret = '') => CryptoJS.SHA256(getSecret(secret));

const decryptNodeCompatiblePayload = (payload, secret = '') => {
    const [ivHex, encryptedHex] = payload.split(':');

    if (!ivHex || !encryptedHex) {
        throw new Error('Invalid encrypted payload format');
    }

    const iv = CryptoJS.enc.Hex.parse(ivHex);
    const ciphertext = CryptoJS.enc.Hex.parse(encryptedHex);
    const key = getKey(secret);
    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext },
        key,
        {
            iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7,
        }
    ).toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
        throw new Error('Unable to decrypt response payload');
    }

    return JSON.parse(decrypted);
};

export const encryptPayload = (payload, secret = '') => {
    const iv = CryptoJS.lib.WordArray.random(IV_LENGTH_BYTES);
    const key = getKey(secret);
    const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), key, {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
    });

    return `${CryptoJS.enc.Hex.stringify(iv)}:${encrypted.ciphertext.toString(CryptoJS.enc.Hex)}`;
};

export const decryptPayload = (payload, secret = '') => {
    if (typeof payload !== 'string' || payload.trim() === '') {
        throw new Error('Encrypted payload must be a non-empty string');
    }

    if (payload.includes(':')) {
        return decryptNodeCompatiblePayload(payload, secret);
    }

    const legacyKey = getKey(secret).toString(CryptoJS.enc.Hex);
    const bytes = CryptoJS.AES.decrypt(payload, legacyKey);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
        throw new Error('Unable to decrypt response payload');
    }

    return JSON.parse(decrypted);
};
