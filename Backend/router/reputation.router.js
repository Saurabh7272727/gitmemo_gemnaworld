import express from 'express';
import { getReputation, updateReputation } from '../controller/reputation.controller.js';
import { parseRequest, reputationSchema } from '../middleware/validate.m.js';
import { authenticateUser } from '../middleware/tokenAdd.m.js';

const router = express.Router();

router.get('/:userId', authenticateUser, getReputation);
router.put('/:userId', authenticateUser, parseRequest(reputationSchema), updateReputation);

export default router;