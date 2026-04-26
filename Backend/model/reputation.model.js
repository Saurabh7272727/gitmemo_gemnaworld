import mongoose from "mongoose";

const reputationSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel",
        required: true,
        unique: true,
    },
    projectsCompleted: {
        type: Number,
        default: 0,
    },
    totalProjects: {
        type: Number,
        default: 0,
    },
    completionRate: {
        type: Number,
        default: 0, // percentage
    },
    reliabilityScore: {
        type: Number,
        default: 0,
    },
    skills: [{
        skill: String,
        level: Number, // 1-10
    }],
    leadershipCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Reputation = mongoose.model('Reputation', reputationSchema);

export { Reputation };