import appAuth from '../config/github.js';
import GitHubInstallation from '../model/githubApp.model.js';

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


export { tokenAdd };