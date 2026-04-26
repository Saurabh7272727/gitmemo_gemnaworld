import express from 'express';
import { getBadges, awardBadge } from '../controller/badge.controller.js';
import { parseRequest, badgeSchema } from '../middleware/validate.m.js';
import { authenticateUser } from '../middleware/tokenAdd.m.js';

const router = express.Router();

router.get('/:userId', authenticateUser, getBadges);
router.post('/', authenticateUser, parseRequest(badgeSchema), awardBadge);

export default router;