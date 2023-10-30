import express from 'express';
import userCtl from '../controller/userCtl.js';
const router = express.Router();
//test without authorize
router.post('/',userCtl.insertOne);
export default router;