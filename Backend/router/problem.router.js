import express from 'express';
import { postProblem, getProblems, joinProblem, solveProblem } from '../controller/problem.controller.js';
import { parseRequest, problemSchema } from '../middleware/validate.m.js';
import { authenticateUser } from '../middleware/tokenAdd.m.js';

const router = express.Router();

router.post('/', authenticateUser, parseRequest(problemSchema), postProblem);
router.get('/', authenticateUser, getProblems);
router.post('/join', authenticateUser, joinProblem);
router.post('/:problemId/solve', authenticateUser, solveProblem);

export default router;