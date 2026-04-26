import { Task } from '../model/task.model.js';
import { Contribution } from '../model/contribution.model.js';
import { getCachedJson, setCachedJson, invalidateCache } from '../service/cacheUtils.js';
import { createETag } from '../service/encryption.js';

export const createTask = async (req, res, next) => {
    try {
        const { projectId, title, description, assignedTo, deadline } = req.body;
        const createdBy = req.user?.id;

        const task = new Task({
            project: projectId,
            title,
            description,
            assignedTo,
            deadline,
            createdBy,
        });

        await task.save();
        await invalidateCache(`tasks:${projectId}`);
        res.status(201).json({ message: 'Task created successfully', task });
    } catch (error) {
        next(error);
    }
};

export const getTasks = async (req, res, next) => {
    try {
        const { projectId } = req.params;
        const cacheKey = `tasks:${projectId}`;
        const cached = await getCachedJson(cacheKey);
        if (cached) {
            const etag = createETag(cached);
            if (req.headers['if-none-match'] === etag) {
                return res.status(304).end();
            }
            res.set('ETag', etag);
            return res.json(cached);
        }

        const tasks = await Task.find({ project: projectId }).populate('assignedTo', 'email username').populate('createdBy', 'email username');
        const payload = tasks.map((task) => task.toObject());
        await setCachedJson(cacheKey, payload, 90);
        res.set('ETag', createETag(payload));
        res.json(payload);
    } catch (error) {
        next(error);
    }
};

export const updateTaskStatus = async (req, res, next) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        const userId = req.user?.id;

        const task = await Task.findById(taskId);
        if (!task) return res.status(404).json({ message: 'Task not found' });
        if (!task.assignedTo || task.assignedTo.toString() !== userId) return res.status(403).json({ message: 'Not assigned to this task' });

        task.status = status;
        if (status === 'completed') task.completedAt = new Date();
        await task.save();
        await invalidateCache(`tasks:${task.project}`);

        const contribution = new Contribution({
            user: userId,
            project: task.project,
            task: taskId,
            type: 'manual',
            description: `Completed task: ${task.title}`,
        });
        await contribution.save();

        res.json({ message: 'Task updated successfully' });
    } catch (error) {
        next(error);
    }
};