import BaseController from "./baseCtl";
import db from '../models';
import { AppConstant } from "../AppConstant";
import { Op } from "sequelize";
class LessonCtl extends BaseController{
    constructor(){
        super(db.Lesson)
    }
    getByCourseId = async (req,res) => {
        try {
            const { courseId, userId}  = req.body;
            const allLessons = await this.modelName.findAll({
                where: {
                    courseId: courseId
                }
            });
            let allPromise = [];
            for(let i = 0; i< allLessons.length; i++){
                const user_lesson_process = db.user_lesson_process.findOne({
                    where: {
                        lessonId: allLessons[i].id,
                        userId: userId
                    }
                });
                allPromise.push(user_lesson_process);
            }
            let lessonPromises = [];
            await Promise.all(allPromise).then((values) => {
                const completed = values.filter((it) => {return it?.completedStatus === AppConstant.COMPLETE_STATUS}).map(item => item.lessonId);
                const inprogress = values.filter((it) => {return it?.completedStatus === AppConstant.INPROGRESS_STATUS}).map(item => item.lessonId);
                const upcoming = values.filter((it) => {return it?.completedStatus === AppConstant.NEW_STATUS}).map(item => item.lessonId);
                console.log(upcoming)
                lessonPromises.push(db.Lesson.findAll({ where: { id: completed}}));
                lessonPromises.push(db.Lesson.findAll({ where: { id: inprogress}}));
                lessonPromises.push(db.Lesson.findAll({ where: { id: upcoming}}));
                    
            })
            Promise.all(lessonPromises).then(values => {
                res.status(200).json({
                    error: false,
                    mesage: 'get by categoryId successfully',
                    lessons: {
                        completed: values[0],
                        inprogress: values[1],
                        upcoming: values[2]
                    }
                })
            })        
        } catch (error) {
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
    }

    updateUserLessonStatus = async (req, res) => {
        try{
            const { status, updateAt, lessonId, userId} = req.body;
            if(status === AppConstant.COMPLETE_STATUS || status ===AppConstant.INPROGRESS_STATUS ){
                let dataUpdate = await db.user_lesson_process.update(
                    { 
                        completedStatus: status,
                        completedDate: updateAt
                    },
                    {
                        where: {
                            userId: userId,
                            lessonId: lessonId
                        }
                    }
                );
                res.status(200).json({
                    error: false,
                    message: 'update successfully',
                    user_lesson_process: dataUpdate
                })
            }
            else res.status(400).json({
                error: true,
                message: "Invalid Status"
            })

        }catch(err){
            res.status(500).json({
                error: true,
                message: err.message
            })
        }
        

    }
    getQuizForLessonByLessonId = async (req, res) => {
        try {
            const lessonId = req.params.id;
            const quiz = await db.Quiz.findOne({
                where: {lessonId: lessonId}
            });
            let questionIds = quiz.questionIds.split(',');
            const questions = await db.Question.findAll({
                where: {
                    id: {
                        [Op.in]: questionIds
                    }
                }
            })
            res.status(200).json({
                error: false,
                data: questions,
                message: 'Get successfully'
            })
        } catch (error) {
            res.status(500).json({
                error: true,
                message: err.message
            })
        }
    }
}
module.exports = new LessonCtl();