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
}
module.exports = new LessonCtl();