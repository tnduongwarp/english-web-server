import db from '../models/index.js'
import bcrypt from 'bcrypt'

let userCtl = {
    insertOne: async  (req, res) => {
        const data = req.body;
        const salt = bcrypt.genSaltSync(10);
        console.log(data);
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
    } 
    
    
}
export default userCtl;