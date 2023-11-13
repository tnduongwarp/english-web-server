import BaseController from "./baseCtl";
import db from '../models'
class LessonCtl extends BaseController{
    constructor(){
        super(db.Lesson)
    }
    getByCourseId = async (req,res) => {
        try {
            const { id } = req.body;
            const data = await this.modelName.findAll({
                where: {
                    courseId: id
                }
            });
            res.status(200).json({
                error: false,
                mesage: 'get by categoryId successfully',
                courses: data
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