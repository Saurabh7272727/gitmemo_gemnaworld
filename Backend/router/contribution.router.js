import express from 'express';
import { logContribution, getContributions } from '../controller/contribution.controller.js';
import { parseRequest, contributionSchema } from '../middleware/validate.m.js';
import { authenticateUser } from '../middleware/tokenAdd.m.js';

const router = express.Router();

router.post('/', authenticateUser, parseRequest(contributionSchema), logContribution);
router.get('/', authenticateUser, getContributions);

export default router;