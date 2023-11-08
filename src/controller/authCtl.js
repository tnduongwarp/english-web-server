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
            console.log(err);
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
            const hashPassword = await bcrypt.hash(req.body.password, salt);

            await db.User.create({
                username: req.body.username,
                password: bcrypt.hashSync(req.body?.password, salt),
                email: req.body.email,
                registration_date: new Date(),
                profile_picture: req.body?.profile_picture,
                role: req.body.role
            })

            res
                .status(201)
                .json({ error: false, message: "Account created sucessfully" });
        } catch (err) {
            console.log(err);
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
            console.log(err);
            res.status(500).json({ error: true, message: "Internal Server Error" });
        }
    }
}
export default authCtl;