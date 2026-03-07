import GitHubInstallation from "../model/githubApp.model.js";
import { fetchRepositories } from './github.service.js';


export const handleCallback = async (req, res) => {
    const { installation_id } = req.query;

    const findUser = await GitHubInstallation.findOne({ user: req?.user?.id });

    if (findUser) {
        findUser.installationId = installation_id;
        await findUser.save();
    } else {
        await GitHubInstallation.create({
            user: req.user.id,
            installationId: installation_id,
        });

        const data = await fetchRepositories(installation_id);
        await GitHubInstallation.updateOne({ user: req?.user?.id }, {
            $push: {
                repo: {
                    $each: [
                        ...data
                    ]
                }
            }
        });


    }

    res.redirect(`${process.env.FORNTEND_URL}?connect=true`);
};