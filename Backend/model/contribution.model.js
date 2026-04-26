import mongoose from "mongoose";

const contributionSchema = new mongoose.Schema({
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
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
    },
    type: {
        type: String,
        enum: ["commit", "manual", "review"],
        required: true,
    },
    description: String,
    proof: String, // link or details
    date: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Contribution = mongoose.model('Contribution', contributionSchema);

export { Contribution };