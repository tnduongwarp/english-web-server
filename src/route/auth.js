import express from 'express';
import authCtl from '../controller/authCtl.js'
const router = express.Router();
router.post('/login',authCtl.login);
router.post('/signUp', authCtl.signUp)
router.delete('/logout', authCtl.logOut)
router.post('/login-with-gg', authCtl.handleGoogleLogin)
router.post('/get-change-pw-token', authCtl.sendChangePwToken)
export default router;
