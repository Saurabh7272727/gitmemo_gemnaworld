import express from 'express';
import { createProject, getProjects, joinProject, completeProject } from '../controller/project.controller.js';
import { parseRequest, projectSchema, joinProjectSchema } from '../middleware/validate.m.js';
import { authenticateUser } from '../middleware/tokenAdd.m.js';

const router = express.Router();

router.post('/', authenticateUser, parseRequest(projectSchema), createProject);
router.get('/', authenticateUser, getProjects);
router.post('/join', authenticateUser, parseRequest(joinProjectSchema), joinProject);
router.put('/:projectId/complete', authenticateUser, completeProject);

export default router;