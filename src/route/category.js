import express from 'express';
import categoryCtl from '../controller/categoryCtl.js';
import authorization from '../utils/authorize.js';
const router = express.Router();
//test without authorize
router.get('/',[authorization.verifyToken, authorization.isUserOrAdmin],categoryCtl.getAll);
router.post('/update-status',[authorization.verifyToken, authorization.isUserOrAdmin], categoryCtl.editStatus)
export default router;
//,[authorization.verifyToken, authorization.isUser]