import axios from "axios";
import crypto from 'crypto';
import dotenv from 'dotenv';
import { UserModel } from '../model/oauth.model.js';

dotenv.config();


const REDIRECT_URL = 'http://localhost:3000/auth/oauth/callback'

// Step 1: Redirect to GitHub OAuth
const loginANDsignup = async (req, res) => {
    const state = crypto.randomBytes(16).toString('hex');
    // const url = `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${state}&scope=read:user user:email`;
    const url = `https://github.com/login/oauth/authorize?client_id=${process.env.OAUTH_CLIENT_ID}&redirect_uri=${REDIRECT_URL}&state=${state}&scope=repo read:user user:email`;
    res.redirect(url);
}



const callback = async (req, res) => {
    const { code, state } = req.query;
    const FORNTEND_URL = process.env.FORNTEND_URL;

    if (!(code || state)) {
        return res.status(404).json({
            message: "crendiatials are missing...",
            success: false,
            status: 404
        })
    }

    try {
        const tokenRes = await axios.post('https://github.com/login/oauth/access_token', {
            client_id: process.env.OAUTH_CLIENT_ID,
            client_secret: process.env.OAUTH_CLIENT_SECRET,
            code: code,
            redirect_uri: REDIRECT_URL
        }, {
            headers: { Accept: 'application/json' }
        });

        const oauthToken = tokenRes.data.access_token;

        // Get user info
        const userRes = await axios.get('https://api.github.com/user', {
            headers: { Authorization: `Bearer ${oauthToken}` }
        });

        const emailRes = await axios.get('https://api.github.com/user/emails', {
            headers: { Authorization: `Bearer ${oauthToken}` }
        });

        // Save user with OAuth token
        const user = {
            githubId: userRes.data.id,
            username: userRes.data.login,
            email: emailRes.data[0].email,
            avatar: userRes.data.avatar_url,
            access_token: oauthToken,
            createdAt: new Date()
        };

        let valuesOfUser = Object.values(user)
        valuesOfUser = valuesOfUser.filter(item => item);

        if (valuesOfUser.length === 6) {
            const userFind = await UserModel.findOne({ email: emailRes.data[0].email });
            if (userFind) {
                return res.redirect(`${FORNTEND_URL}/server?userId=${userFind?._id}`)
            }
            const userData = new UserModel(user);
            await userData.save()
            return res.redirect(`${FORNTEND_URL}/server?userId=${userData?._id}&signup=true`)
        } else {
            return res.status(501).json({
                message: "OAuth are missing data",
                success: false,
                status: 501,
            })
        }

    } catch (error) {
        return res.status(501).json({
            message: "Error",
            success: false,
            status: 501,
            errorDetails: error.message || "something was wrong on server side catch"
        })
    }


}

const fetchProfileLogger = async (req, res) => {

    const bodyData = req?.body;

    if (bodyData == null || bodyData == undefined || !bodyData?.userId) {
        return res.status(404).json({
            message: "crendiatials are missing...",
            success: false,
            status: 404
        })
    }

    try {
        const findUserData = await UserModel.findOne({ _id: bodyData.userId });
        if (!findUserData) {
            return res.status(404).json({
                message: "user data are not found",
                success: false,
                status: 404
            })
        }

        if (findUserData?.email) {
            return res.status(200).json({
                message: "User data founded",
                success: true,
                status: 200,
                findUserData: findUserData
            })
        } else {
            throw new Error("something was wrong");
        }

    } catch (err) {
        return res.status(505).json({
            message: err.message || "user data are not found",
            success: false,
            status: 505
        })
    }

}

export { loginANDsignup, callback, fetchProfileLogger };