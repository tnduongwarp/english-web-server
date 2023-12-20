import db from '../models/index.js';
import jwt from 'jsonwebtoken'
const verifyRefreshToken =  async (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;
    try{
        const userToken = await db.user_token.findOne({ where:{token: refreshToken} })
            if (!userToken)
                return Promise.reject({ error: true, message: "Invalid refresh token" });
            const tokenDetails = jwt.verify(refreshToken, privateKey)
                if (!tokenDetails)
                    return Promise.reject({ error: true, message: "Invalid refresh token" });
                return Promise.resolve({
                    tokenDetails,
                    error: false,
                    message: "Valid refresh token",
                });
           
    }  
    catch(err) {
            return Promise.reject({ error: true, message: 'Invalid refresh token' })
        }
}
    

export default verifyRefreshToken;