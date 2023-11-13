import express from 'express';
import userCtl from '../controller/userCtl.js';
import authorization from '../utils/authorize.js';
const router = express.Router();
//test without authorize
router.post('/',[authorization.verifyToken, authorization.isUser],userCtl.insertOne);
export default router;