import express from 'express';
import { createTask, getTasks, updateTaskStatus } from '../controller/task.controller.js';
import { parseRequest, taskSchema, updateTaskStatusSchema } from '../middleware/validate.m.js';
import { authenticateUser } from '../middleware/tokenAdd.m.js';

const router = express.Router();

router.post('/', authenticateUser, parseRequest(taskSchema), createTask);
router.get('/:projectId', authenticateUser, getTasks);
router.put('/:taskId/status', authenticateUser, parseRequest(updateTaskStatusSchema), updateTaskStatus);

export default router;