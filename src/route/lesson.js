import express from 'express';
import lessonCtl from '../controller/lessonCtl.js';
import authorization from '../utils/authorize.js';
const router = express.Router();
//test without authorize
router.post('/get-all-lesson',[authorization.verifyToken, authorization.isUser],lessonCtl.getByCourseId);
router.get('/get-quiz/:id',[authorization.verifyToken, authorization.isUser], lessonCtl.getQuizForLessonByLessonId);
router.post('/update-status',[authorization.verifyToken, authorization.isUser], lessonCtl.updateUserLessonStatus);
router.post('/get-data-for-home-page', [authorization.verifyToken, authorization.isUser], lessonCtl.getProcessInfo);
router.get('/:id',[authorization.verifyToken, authorization.isUser], lessonCtl.getById);
router.post('/list-lesson-for-admin',[authorization.verifyToken, authorization.isAdmin], lessonCtl.getLessonByCourseIdAndCategoryId);
router.post('/add-listening',[authorization.verifyToken, authorization.isAdmin], lessonCtl.addNewListeningLesson);
router.post('/add-reading',[authorization.verifyToken, authorization.isAdmin], lessonCtl.addNewReadingLesson);
router.post('/add-vocabulary', [authorization.verifyToken, authorization.isAdmin], lessonCtl.addNewVocabularyLesson)
export default router;
//,[authorization.verifyToken, authorization.isUser]