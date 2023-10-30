import express from 'express';
import authCtl from '../controller/authCtl.js'
const router = express.Router();
router.post('/login',authCtl.login);
export default router;
