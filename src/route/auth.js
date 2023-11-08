import express from 'express';
import authCtl from '../controller/authCtl.js'
const router = express.Router();
router.post('/login',authCtl.login);
router.post('/signUp', authCtl.signUp)
router.delete('/logout', authCtl.logOut)
export default router;
