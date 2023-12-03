import jwt from "jsonwebtoken";
import db from '../models/index.js'
const generateTokens = async (user) => {
    try {
        const payload = { userId: user.id, role: user.role };
        const accessToken = jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            { expiresIn: "5m" }
        );
        const refreshToken = jwt.sign(
            payload,
            process.env.REFRESH_TOKEN_PRIVATE_KEY,
            { expiresIn: "30d" }
        );

        const userToken = await db.user_token.findOne({ where:{userId: user.id }});
        if (userToken) {
            await db.user_token.destroy({
                where:{
                    userId: user.id
                }
            });
        }
        const newUserToken = {
            userId: user.id,
            token: refreshToken,
            createAt: new Date()
        };
        await db.user_token.create(newUserToken);
        return Promise.resolve({ accessToken, refreshToken });
    } catch (err) {
        return Promise.reject(err);
    }
};

export default generateTokens;