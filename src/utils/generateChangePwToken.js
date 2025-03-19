import jwt from "jsonwebtoken";
import db from '../models/index.js'
const generateChangePwToken = async (email) => {
    try {
        const payload = { email: email, date: new Date() };
        const changePasswordToken = jwt.sign(
            payload,
            process.env.TOKEN_KEY,
            { expiresIn: "5m" }
        );
        const user = await db.User.findOne({ where: {email: email}});
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
            token: changePasswordToken,
            createAt: new Date()
        };
        await db.user_token.create(newUserToken);
        return Promise.resolve({ changePasswordToken });
    } catch (err) {
        return Promise.reject({message: 'Internal Server Error'});
    }
};

export default generateChangePwToken;