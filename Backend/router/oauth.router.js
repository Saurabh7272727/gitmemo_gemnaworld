import { Router } from "express";
import { loginANDsignup, callback, fetchProfileLogger } from '../controller/outh.controller.js';
const router = new Router();

router.post('/user/profile', fetchProfileLogger);
router.get('/oauth/login&signup', loginANDsignup);
router.get('/oauth/callback', callback);

export default router;