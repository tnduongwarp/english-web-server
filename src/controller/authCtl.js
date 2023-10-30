import db from '../models/index.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const authCtl = {
    login: async (req,res) => {
        try {
            const {username,password}= req.body;
            if (!(username && password)) 
            {
              return res.status(400).send("All input is required");
            };
            var user = await db.User.findOne({ 
                where:
                    {
                        username: username 
                    }
            });
            if (user && (await bcrypt.compare(password, user.password)) ) 
            {
              const token = await jwt.sign
              (
                { 
                  username: user.username,
                  role: user.role
                },
                process.env.TOKEN_KEY,
                {
                expiresIn: "2h",
                }
              );
             
              res.status(200).header("auth-token", token).json(user);
            }
            else res.status(400).send("Invalid Credentials");
          } catch (err) {
                console.log(err);
            }
    }
}
export default authCtl;