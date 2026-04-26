import { Problem } from '../model/problem.model.js';
import { getCachedJson, setCachedJson, invalidateCache } from '../service/cacheUtils.js';
import { createETag } from '../service/encryption.js';

export const postProblem = async (req, res, next) => {
    try {
        const { title, description, category, tags } = req.body;
        const postedBy = req.user?.id;

        const problem = new Problem({ title, description, postedBy, category, tags });
        await problem.save();
        await invalidateCache('problems:all');
        res.status(201).json({ message: 'Problem posted successfully', problem });
    } catch (error) {
        next(error);
    }
};

export const getProblems = async (req, res, next) => {
    try {
        const cacheKey = 'problems:all';
        const cached = await getCachedJson(cacheKey);
        if (cached) {
            const etag = createETag(cached);
            if (req.headers['if-none-match'] === etag) return res.status(304).end();
            res.set('ETag', etag);
            return res.json(cached);
        }

        const problems = await Problem.find().populate('postedBy', 'email username').populate('solvers.user', 'email username');
        const payload = problems.map((problem) => problem.toObject());
        await setCachedJson(cacheKey, payload, 120);
        res.set('ETag', createETag(payload));
        res.json(payload);
    } catch (error) {
        next(error);
    }
};

export const joinProblem = async (req, res, next) => {
    try {
        const { problemId } = req.body;
        const userId = req.user?.id;

        const problem = await Problem.findById(problemId);
        if (!problem) return res.status(404).json({ message: 'Problem not found' });

        const alreadyJoined = problem.solvers.some((solver) => solver.user.toString() === userId);
        if (alreadyJoined) return res.status(400).json({ message: 'Already joined' });

        problem.solvers.push({ user: userId });
        await problem.save();
        await invalidateCache('problems:all');
        res.json({ message: 'Joined problem successfully' });
    } catch (error) {
        next(error);
    }
};

export const solveProblem = async (req, res, next) => {
    try {
        const { problemId, solution } = req.body;
        const userId = req.user?.id;

        const problem = await Problem.findById(problemId);
        if (!problem) return res.status(404).json({ message: 'Problem not found' });

        problem.solution = { description: solution, providedBy: userId, acceptedAt: new Date() };
        problem.status = 'solved';
        await problem.save();
        await invalidateCache('problems:all');

        res.json({ message: 'Solution submitted successfully' });
    } catch (error) {
        next(error);
    }
};