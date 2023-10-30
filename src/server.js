import express from 'express';
import bodyParser from 'body-parser';
import connect from '../config/connectDB.js';
import route from './route/index.js'
import cors from 'cors';
import dotenv from 'dotenv'
dotenv.config();
connect();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const corsOption = {};
app.use(cors(corsOption));
app.get('/', (req,res) => {
    res.send('Hello');
})
route(app);
app.listen(3000, ()=> {
    console.log("server is listening on port 3000")
})