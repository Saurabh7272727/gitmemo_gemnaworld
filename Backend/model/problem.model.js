import mongoose from "mongoose";

const problemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel",
        required: true,
    },
    category: String,
    tags: [String],
    status: {
        type: String,
        enum: ["open", "in_progress", "solved"],
        default: "open",
    },
    solvers: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usermodel",
        },
        joinedAt: {
            type: Date,
            default: Date.now,
        },
    }],
    solution: {
        description: String,
        providedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "usermodel",
        },
        acceptedAt: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Problem = mongoose.model('Problem', problemSchema);

export { Problem };