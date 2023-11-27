import db from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import generateTokens from "../utils/generateToken.js";
import {
    signUpBodyValidation,
    logInBodyValidation,
} from "../utils/validationSchema.js";
import { refreshTokenBodyValidation } from '../utils/validationSchema.js';
import { Sequelize } from 'sequelize';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';
import sendEmail from '../utils/sendOTPEmail.js';
import generateChangePwToken from '../utils/generateChangePwToken.js';
dotenv.config();
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const authCtl = {
    login: async (req, res) => {
        try {
            const { error } = logInBodyValidation(req.body);
            if (error)
                return res
                    .status(400)
                    .json({ error: true, message: error.details[0].message });
            var user = await db.User.findOne({
                where:
                {
                    username: req.body.username
                }
            });
            if (user && (await bcrypt.compare(req.body.password, user.password))) {
                const { accessToken, refreshToken } = await generateTokens(user);

                res.status(200).json({
                    error: false,
                    message: 'Login successfully!',
                    user,
                    accessToken,
                    refreshToken
                });
            }
            else res.status(401).json({
                error: true,
                message: 'Invalid creditials!'
            });
        } catch (err) {
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    },

    signUp: async (req, res) => {
        try {
            const { error } = signUpBodyValidation(req.body);
            if (error)
                return res
                    .status(400)
                    .json({ error: true, message: error.details[0].message });

            const user = await db.User.findOne({
                where: {
                    [Sequelize.Op.or]: [
                        { username: req.body.username },
                        { email: req.body.email }
                    ]
                }
            });
            if (user?.username === req.body.username)
                return res
                    .status(400)
                    .json({ error: true, message: "User with given username already exist" });
            if (user?.email === req.body.email)
                return res
                    .status(400)
                    .json({ error: true, message: "User with given email already exist" });

            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            await db.User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, salt),
                email: req.body.email,
                registration_date: new Date(),
                profile_picture: req.body?.profile_picture,
                role: req.body.role
            })

            res
                .status(201)
                .json({ error: false, message: "Account created sucessfully" });
        } catch (err) {
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    },

    logOut: async (req, res) => {
        try {
            const { error } = refreshTokenBodyValidation(req.body);
            if (error)
                return res
                    .status(400)
                    .json({ error: true, message: error.details[0].message });

            const userToken = await db.user_token.findOne({ where: { token: req.body.refreshToken } });
            if (!userToken)
                return res
                    .status(200)
                    .json({ error: false, message: "Logged Out Sucessfully" });

            await db.user_token.destroy({
                where: {
                    userId: userToken.id
                }
            });
            res.status(200).json({ error: false, message: "Logged Out Sucessfully" });
        } catch (err) {
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    },

    handleGoogleLogin: async (req,res) => {
        const {token} = req.body
        const ticket = await client.verifyIdToken({
            idToken: token,
        });
        const googleData = ticket.getPayload();
        const user = await db.User.findOne({
            where: {
                     email:googleData.email 
            }
        });
        if(user){
            const { accessToken, refreshToken } = await generateTokens(user);

                res.status(200).json({
                    error: false,
                    message: 'Login successfully!',
                    user,
                    accessToken,
                    refreshToken
                });
        }else{
            const salt = await bcrypt.genSalt(Number(process.env.SALT));
            const newUser = await db.User.create({
                username: googleData.username,
                password: bcrypt.hashSync(googleData.sub, salt),
                email: googleData.email,
                registration_date: new Date(),
                profile_picture: googleData.picture,
                role: 'user'
            });
            const { accessToken, refreshToken } = await generateTokens(newUser);
            res.status(200).json({
                error: false,
                message: 'Login successfully!',
                user: newUser,
                accessToken,
                refreshToken
            });
        }
        
    },
    sendOTPEmail: async (req, res) => {
        const { recipient_email} = req.body;
        if(!recipient_email) res.status(400).json({error: true, message: "email is require!"});
        const user = await db.User.findOne({where:{ email: recipient_email}});
        if(!user) res.status(400).json({error: true, message:"email is incorrect!"})
        else
        sendEmail(req.body)
          .then((response) => res.status(200).json({
            error: false,
            message: response.message
          }))
          .catch((error) => res.status(500).send({
            error: true,
            message: error.message
          }));
    },

    sendChangePwToken: async (req,res) => {
        const {email} = req.body;
        if(!email) res.status(400).json({error: true, message:"email is required!"})
        else {
            generateChangePwToken(email)
            .then((response) => {
                res.status(200).json({
                    error: false,
                    message: 'success',
                    token: response.changePasswordToken
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: true,
                    message: err.message
                })
            })
        }
    }
}
export default authCtl;