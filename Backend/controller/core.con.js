import axios from 'axios';
import { usercreatedrepo } from '../model/user.created.model.js';
import GitHubInstallation from '../model/githubApp.model.js'

const createRepo = async (req, res) => {
    const token = req.token;

    console.log(token);

    const repoData = req.body;
    console.log('body ============= data', repoData);

    if (!repoData) {
        return res.status(404).json({ message: "body data are missing", success: false, status: 404 })
    }

    try {
        const response = await axios.post(
            'https://api.github.com/user/repos',
            {
                ...repoData
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }
        );

        const insertStruture = {
            id: response?.data.id,
            name: response?.data.name,
            owner: response?.data.owner.id,
            html_url: response?.data.html_url,
            description: response?.data.description,
            private: response?.data.private,
            remove: false
        }

        const insertRepo = await GitHubInstallation.findOne({ installationId: req?.installationId });
        if (insertRepo) {
            insertRepo.repo.push(response?.data);
            await insertRepo.save();
        }
        const insertNewRepo = new usercreatedrepo(insertStruture);
        await insertNewRepo.save();

        return res.status(201).json({ message: "repo are created", success: true, status: 201, data: insertStruture })
    } catch (error) {
        return res.status(500).json({ message: error, success: false, status: 500, token: token })

    }
}

const getToCreatedRepo = async (req, res) => {
    const { ownerId } = req.params;

    if (ownerId == null || ownerId == undefined || ownerId === 'undefined') {
        return res.status(404).json({
            message: "ownerId are missing or undefined",
            status: 404,
            success: false
        })
    }

    try {
        const findAllCreatedRepo = await usercreatedrepo.find({ owner: ownerId });

        if (Array.isArray(findAllCreatedRepo)) {
            return res.status(200).json({
                message: "task complete",
                status: 200,
                success: true,
                findAllCreatedRepo
            })
        }

        return res.status(404).json({
            message: "data are missing",
            status: 404,
            success: false,
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message,
            status: 500,
            success: false
        })
    }
}



export { createRepo, getToCreatedRepo };