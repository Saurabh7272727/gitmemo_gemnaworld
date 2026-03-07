import mongoose, { Schema } from "mongoose";

// users collection
const userSchema = new Schema({
    // OAuth data (from user login)
    githubId: String,
    username: String,
    email: String,
    avatar: String,
    access_token: String,

    // GitHub App data
    installationId: Number,  // When user installs GitHub App
    installationToken: {
        lastRefreshed: Date,
        expiresAt: Date
    },

    // GitMemo specific
    reputation: Number,
    badges: [{
        type: String,
        earnedAt: Date,
        projectId: String
    }]
}, { timestamps: true });



const UserModel = mongoose.model('usermodel', userSchema);

export { UserModel };