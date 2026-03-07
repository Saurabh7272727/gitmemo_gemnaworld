import { createAppAuth } from "@octokit/auth-app";
import fs from "fs";

const appAuth = createAppAuth({
    appId: process.env.GITHUB_APP_ID,
    privateKey: fs.readFileSync("gemnaworld.2026-02-22.private-key.pem", "utf8"),
});

export default appAuth;