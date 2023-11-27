import db from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const privateKey = process.env.TOKEN_KEY;
const salt = bcrypt.genSaltSync(10);
let userCtl = {
    insertOne: async  (req, res) => {
        const data = req.body;
        if(data?.username && data?.password && data?.role && data.email){
            try{
                let user = await db.User.create({
                    username: data.username,
                    password: bcrypt.hashSync(data?.password,salt),
                    email: data.email,
                    registration_date: new Date(),
                    profile_picture: data?.profile_picture,
                    role: data.role
                })
                
                res.status(200).json({
                        message: 'success',
                        data:user
                })
                
            }
            catch(err) {console.log(err)} 
        }else{
            res.status(400).json({
                message: 'invalid body'
            })
        }
    } ,
    changePassword : async (req, res) => {
        try{
            const {token, newPassword} = req.body;
            const userToken = await db.user_token.findOne({ where:{ token: token}});
            if(!userToken) res.status(400).json({error: true, message: 'forbiden'});
            else{
                const decodeToken = jwt.verify(token, privateKey);
                if(decodeToken){
                    let user = await db.User.update(
                        {password: bcrypt.hashSync(newPassword,salt)},
                        { where: {id: userToken.userId}}
                    )
                    res.status(200).json({
                        message: 'success',
                        data:user
                })
                }
            }
            
        }catch(err){
            res.status(401).json({
                error: true,
                message: 'token is expired'
            })
        }
        
    }
    
    
}
export default userCtl;