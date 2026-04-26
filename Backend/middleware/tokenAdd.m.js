import appAuth from '../config/github.js';
import GitHubInstallation from '../model/githubApp.model.js';
import { UserModel } from '../model/oauth.model.js';

const map = new Map();


const tokenAdd = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({
            message: "Authorization header missing",
            success: false
        });
    }

    const installationId = authHeader.split(' ')[1];

    try {
        if (!installationId) {
            return res.status(404).json({ message: "installation id are missing", success: false, status: 404 });
        }

        if (map.get(`${installationId}`)) {
            req.token = map.get(`${installationId}`);
            next();
        } else {

            const findKey = await GitHubInstallation.findOne({ installationId: installationId }).populate({
                path: "user",
                select: "-_id access_token"
            });

            map.set(`${installationId}`, findKey?.user?.access_token);
            req.token = map.get(`${installationId}`, findKey?.user?.access_token);
            req.installationId = installationId;
            next()
        }
    } catch (error) {
        return res.status(505).json({ message: error.message, success: false, status: 505 });
    }
}

// New middleware to authenticate user from localStorage userId
const authenticateUser = async (req, res, next) => {
    try {
        // For API calls from frontend, we need to get userId from somewhere
        // Since we're using encrypted payloads, we might need to decrypt and get userId
        // For now, let's assume userId is passed in headers or body
        const userId = req.headers['x-user-id'] || req.body?.userId || req.query?.userId;

        if (!userId) {
            return res.status(401).json({
                message: "User authentication required",
                success: false,
                status: 401
            });
        }

        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(401).json({
                message: "User not found",
                success: false,
                status: 401
            });
        }

        req.user = { id: user._id, githubId: user.githubId };
        next();
    } catch (error) {
        return res.status(500).json({
            message: "Authentication error",
            success: false,
            status: 500
        });
    }
}


export { tokenAdd, authenticateUser };