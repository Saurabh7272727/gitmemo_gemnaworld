import 'express-async-errors';
import dotenv from 'dotenv';
import mongoDBConnection from './service/db/db.mongo.js';
import { connectRedis } from './service/redis.client.js';
import { decryptRequestBody, encryptResponseBody } from './middleware/encryption.m.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.m.js';

dotenv.config();

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import AuthRouter from './router/oauth.router.js';
import GithubAppRouter from './router/githubapp.router.js';
import ProjectRouter from './router/project.router.js';
import TaskRouter from './router/task.router.js';
import ContributionRouter from './router/contribution.router.js';
import BadgeRouter from './router/badge.router.js';
import ReputationRouter from './router/reputation.router.js';
import ProblemRouter from './router/problem.router.js';
const app = express();

try {
    mongoDBConnection();
    connectRedis();
} catch (error) {
    console.error(error);
}

app.use(helmet());
app.use(cors({
    origin: [process.env.FRONTEND_URL || 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Encrypted-Payload', 'If-None-Match', 'X-User-Id', 'X-Encrypted-Payload'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(decryptRequestBody);
app.use(encryptResponseBody);

app.get('/', (req, res) => {
    res.status(200).json({ message: 'Hello gemnaworld', success: true, status: 200 });
});

app.use('/auth', AuthRouter);
app.use('/githubapp', GithubAppRouter);
app.use('/projects', ProjectRouter);
app.use('/tasks', TaskRouter);
app.use('/contributions', ContributionRouter);
app.use('/badges', BadgeRouter);
app.use('/reputation', ReputationRouter);
app.use('/problems', ProblemRouter);

app.use(notFoundHandler);
app.use(globalErrorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});