import { redisClient } from './redis.client.js';

export const getCachedJson = async (key) => {
    if (!redisClient.isOpen) return null;
    const cached = await redisClient.get(key);
    if (!cached) return null;
    return JSON.parse(cached);
};

export const setCachedJson = async (key, value, ttlSeconds = 60) => {
    if (!redisClient.isOpen) return;
    await redisClient.set(key, JSON.stringify(value), { EX: ttlSeconds });
};

export const invalidateCache = async (key) => {
    if (!redisClient.isOpen) return;
    await redisClient.del(key);
};