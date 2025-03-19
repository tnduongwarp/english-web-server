import express from 'express';
import bodyParser from 'body-parser';
import connect from '../config/connectDB.js';
import route from './route/index.js'
import cors from 'cors';
import dotenv from 'dotenv';
import db from './models/index.js';
const test = async () => {
    let word = await db.Word.findAll();
    return word;
}

dotenv.config();
connect();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const corsOption = {};
app.use(cors(corsOption));
app.get('/',async (req,res) => {
    let data = await test();
    res.send(data);
})
route(app);
app.listen(3000, ()=> {
    console.log("server is listening on port 3000")
})