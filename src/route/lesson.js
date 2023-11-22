import express from 'express';
import lessonCtl from '../controller/lessonCtl.js';
import authorization from '../utils/authorize.js';
const router = express.Router();
//test without authorize
router.post('/get-all-lesson',[authorization.verifyToken, authorization.isUser],lessonCtl.getByCourseId);
export default router;
//,[authorization.verifyToken, authorization.isUser]