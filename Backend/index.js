import dotenv from "dotenv";
import mongoDBConnection from './service/db/db.mongo.js';
dotenv.config();

import express from 'express';
import helmet from "helmet";
import cors from 'cors';
import morgan from "morgan";
import AuthRouter from './router/oauth.router.js';
import GithubAppRouter from './router/githubapp.router.js';
const app = express();

try {
    mongoDBConnection();
} catch (error) {
    console.log(error);
}

app.use(helmet());
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ["POST", 'GET'],
    credentials: true,
    allowedHeaders: "*"
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.get('/', (req, res) => {
    res.status(200).json({ message: "Hello gemnaworld", success: true, status: 200 })
})

app.use('/auth', AuthRouter);
app.use('/githubapp', GithubAppRouter);
app.listen(process.env.PORT, () => {
    console.log(`server are listen localhost:${process.env.PORT}`)
})