import express from 'express';
import wordCtl from '../controller/wordCtl.js';
import authorization from '../utils/authorize.js';
const router = express.Router();
//test without authorize
router.post('/get-by-id-array',[authorization.verifyToken, authorization.isUser],wordCtl.getByIds);
export default router;
//,[authorization.verifyToken, authorization.isUser]