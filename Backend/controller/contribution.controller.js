import { Contribution } from '../model/contribution.model.js';
import { getCachedJson, setCachedJson } from '../service/cacheUtils.js';
import { createETag } from '../service/encryption.js';

export const logContribution = async (req, res, next) => {
    try {
        const { projectId, taskId, type, description, proof } = req.body;
        const userId = req.user?.id;

        const contribution = new Contribution({
            user: userId,
            project: projectId,
            task: taskId,
            type,
            description,
            proof,
        });

        await contribution.save();
        await setCachedJson(`contributions:${projectId}`, null, 1);
        res.status(201).json({ message: 'Contribution logged successfully', contribution });
    } catch (error) {
        next(error);
    }
};

export const getContributions = async (req, res, next) => {
    try {
        const { projectId, userId } = req.query;
        let query = {};
        if (projectId) query.project = projectId;
        if (userId) query.user = userId;
        const cacheKey = `contributions:${projectId || 'all'}:${userId || 'all'}`;
        const cached = await getCachedJson(cacheKey);
        if (cached) {
            const etag = createETag(cached);
            if (req.headers['if-none-match'] === etag) {
                return res.status(304).end();
            }
            res.set('ETag', etag);
            return res.json(cached);
        }

        const contributions = await Contribution.find(query).populate('user', 'email username').populate('project', 'title').populate('task', 'title');
        const payload = contributions.map((item) => item.toObject());
        await setCachedJson(cacheKey, payload, 90);
        res.set('ETag', createETag(payload));
        res.json(payload);
    } catch (error) {
        next(error);
    }
};