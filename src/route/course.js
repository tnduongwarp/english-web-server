import express from 'express';
import courseCtl from '../controller/courseCtl.js';
import authorization from '../utils/authorize.js';
const router = express.Router();
//test without authorize
router.get('/:id',[authorization.verifyToken, authorization.isUser],courseCtl.getByCategoryId);
export default router;
//,[authorization.verifyToken, authorization.isUser]