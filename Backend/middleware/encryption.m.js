import { decryptObject, encryptObject } from '../service/encryption.js';

export const decryptRequestBody = (req, res, next) => {
    try {
        if (req.headers['x-encrypted-payload'] === 'true' && req.body?.payload !== undefined) {
            if (typeof req.body.payload !== 'string') {
                throw new Error('Encrypted payload must be a string');
            }
            req.body = decryptObject(req.body.payload);
        }
        next();
    } catch (error) {
        res.status(400).json({
            message: error.message || 'Invalid encrypted payload',
            success: false,
            status: 400,
        });
    }
};

export const encryptResponseBody = (req, res, next) => {
    const originalJson = res.json.bind(res);

    res.json = (body) => {
        if (req.headers['x-encrypted-payload'] === 'true') {
            const encrypted = encryptObject(body);
            return originalJson({ encryptedPayload: encrypted });
        }
        return originalJson(body);
    };

    next();
};
