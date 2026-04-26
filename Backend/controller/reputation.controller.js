import { Reputation } from '../model/reputation.model.js';
import { getCachedJson, setCachedJson, invalidateCache } from '../service/cacheUtils.js';
import { createETag } from '../service/encryption.js';

export const getReputation = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cacheKey = `reputation:${userId}`;
        const cached = await getCachedJson(cacheKey);
        if (cached) {
            const etag = createETag(cached);
            if (req.headers['if-none-match'] === etag) return res.status(304).end();
            res.set('ETag', etag);
            return res.json(cached);
        }

        let rep = await Reputation.findOne({ user: userId });
        if (!rep) {
            rep = new Reputation({ user: userId });
            await rep.save();
        }
        const payload = rep.toObject();
        await setCachedJson(cacheKey, payload, 120);
        res.set('ETag', createETag(payload));
        res.json(payload);
    } catch (error) {
        next(error);
    }
};

export const updateReputation = async (req, res, next) => {
    try {
        const { userId, skills, leadershipCount } = req.body;
        let rep = await Reputation.findOne({ user: userId });
        if (!rep) {
            rep = new Reputation({ user: userId });
        }
        if (skills) rep.skills = skills;
        if (leadershipCount !== undefined) rep.leadershipCount = leadershipCount;
        await rep.save();
        await invalidateCache(`reputation:${userId}`);
        res.json({ message: 'Reputation updated', rep });
    } catch (error) {
        next(error);
    }
};