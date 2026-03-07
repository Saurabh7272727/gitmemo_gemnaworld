import express from "express";
import { handleCallback } from "../controller/githubApp.controller.js";
import { handleWebhook } from "../controller/github.weebhook.js";
import GitHubInstallation from '../model/githubApp.model.js';
import { tokenAdd } from '../middleware/tokenAdd.m.js';
import { createRepo, getToCreatedRepo } from '../controller/core.con.js';


const router = express.Router();

router.get("/callback", (req, res, next) => {
    const { state } = req.query;
    req.user = { id: state };
    next();
}, handleCallback);
router.post("/webhook", handleWebhook);


router.get('/profile/:id', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({ message: "id are missing", success: false, status: 404 })
    }

    try {
        const findUser = await GitHubInstallation.findOne({ user: id }).populate({
            path: "user"
        }).lean();
        // console.log(id, '============', findUser);
        if (findUser) {
            return res.json({
                message: "profile found",
                status: 200,
                success: true,
                repoData: findUser
            })
        } else {
            return res.status(404).json({ message: "data not found", success: false, status: 404 })
        }
    } catch (error) {
        return res.status(404).json({ message: error.message, success: false, status: 404 });
    }
})


router.post('/create/repo', tokenAdd, createRepo);

router.get('/access/created/repo/:ownerId', getToCreatedRepo)

export default router;