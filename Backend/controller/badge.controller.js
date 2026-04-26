import { Badge } from '../model/badge.model.js';
import { getCachedJson, setCachedJson, invalidateCache } from '../service/cacheUtils.js';
import { createETag } from '../service/encryption.js';

export const getBadges = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cacheKey = `badges:${userId}`;
        const cached = await getCachedJson(cacheKey);
        if (cached) {
            const etag = createETag(cached);
            if (req.headers['if-none-match'] === etag) return res.status(304).end();
            res.set('ETag', etag);
            return res.json(cached);
        }

        const badges = await Badge.find({ user: userId }).populate('project', 'title').populate('user', 'email username');
        const payload = badges.map((badge) => badge.toObject());
        await setCachedJson(cacheKey, payload, 90);
        res.set('ETag', createETag(payload));
        res.json(payload);
    } catch (error) {
        next(error);
    }
};

export const awardBadge = async (req, res, next) => {
    try {
        const { userId, projectId, type, title, description } = req.body;

        const badge = new Badge({ user: userId, project: projectId, type, title, description });
        await badge.save();
        await invalidateCache(`badges:${userId}`);

        res.status(201).json({ message: 'Badge awarded successfully', badge });
    } catch (error) {
        next(error);
    }
};