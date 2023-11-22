import BaseController from "./baseCtl";
import db from '../models';
import { AppConstant } from "../AppConstant";
class LessonCtl extends BaseController{
    constructor(){
        super(db.Lesson)
    }
    getByCourseId = async (req,res) => {
        try {
            const { lessonId, userId}  = req.body;
            const allLessons = await this.modelName.findAll({
                where: {
                    courseId: lessonId
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
            Promise.all(allPromise).then((values) => {
                const completed = values.filter((it) => {return it.completedStatus === AppConstant.COMPLETE_STATUS});
                const inprogress = values.filter((it) => {return it.completedStatus === AppConstant.INPROGRESS_STATUS});
                const upcoming = values.filter((it) => {return it.completedStatus === AppConstant.NEW_STATUS});
                res.status(200).json({
                    error: false,
                    mesage: 'get by categoryId successfully',
                    lessons: {
                        completed: completed,
                        inprogress: inprogress,
                        upcoming: upcoming
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
}
module.exports = new LessonCtl();