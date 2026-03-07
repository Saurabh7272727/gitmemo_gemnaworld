import { Octokit } from "@octokit/rest";
import appAuth from "../config/github.js";

const getInstallationOctokit = async (installationId) => {
    const { token } = await appAuth({
        type: "installation",
        installationId,
    });

    return new Octokit({
        auth: token,
    });
};

const fetchRepositories = async (installationId) => {
    const octokit = await getInstallationOctokit(installationId);

    const { data } =
        await octokit.rest.apps.listReposAccessibleToInstallation();

    return data.repositories;
};

export {
    getInstallationOctokit,
    fetchRepositories,
};