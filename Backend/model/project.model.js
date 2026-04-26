import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel",
        required: true,
    },
    techStack: [{
        type: String,
    }],
    teamSize: {
        type: Number,
        required: true,
    },
    roles: [{
        role: String,
        count: Number,
    }],
    status: {
        type: String,
        enum: ["open", "in_progress", "completed"],
        default: "open",
    },
    members: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usermodel",
        },
        role: String,
        joinedAt: {
            type: Date,
            default: Date.now,
        },
    }],
    githubRepo: {
        id: Number,
        name: String,
        url: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    completedAt: Date,
}, { timestamps: true });

const Project = mongoose.model('Project', projectSchema);

export { Project };