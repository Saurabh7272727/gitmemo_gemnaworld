import mongoose from "mongoose";
import './oauth.model.js';

const installationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel",
    },
    installationId: {
        type: String,
        required: true,
    },
    connectedAt: {
        type: Date,
        default: Date.now,
    },



    repo: [{
        id: Number,
        name: String,
        fullName: String,
        description: String,
        visibility: String,
        defaultBranch: String,
        homepage: String,

        owner: {
            id: Number,
            login: String,
            url: String,
        },

        language: String,
        topics: [String],
        visibility: String,
        forks: Number,
        open_issues: Number,
        watchers: Number,
        default_branch: String,
        features: {
            issues: Boolean,
            projects: Boolean,
            pullRequests: Boolean,
            discussions: Boolean,
            forkable: Boolean,
            archived: Boolean
        },

        timestamps: {
            createdAt: Date,
            updatedAt: Date,
            pushedAt: Date
        }
    }]

}, { timestamps: true });

const GitHubInstallation = mongoose.model(
    "GitHubInstallation",
    installationSchema
);



export default GitHubInstallation;