import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel",
        required: true,
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true,
    },
    type: {
        type: String,
        enum: ["completion", "leadership", "contribution"],
        required: true,
    },
    title: String,
    description: String,
    issuedAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Badge = mongoose.model('Badge', badgeSchema);

export { Badge };