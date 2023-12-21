import express from 'express';
import authorization from '../utils/authorize.js';
import quizCtl from '../controller/QuizCtl.js'
const router = express.Router();
//test without authorize
router.get('/:id',[authorization.verifyToken, authorization.isUser],quizCtl.getByLessonId);
router.post('/add-quiz',[authorization.verifyToken, authorization.isAdmin], quizCtl.addQuiz)
export default router;
//,[authorization.verifyToken, authorization.isUser]