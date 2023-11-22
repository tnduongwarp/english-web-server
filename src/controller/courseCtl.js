import BaseController from "./baseCtl";
import db from '../models'
class CourseCtl extends BaseController{
    constructor(){
        super(db.Course)
    }
    getByCategoryId = async (req,res) => {
        try {
            const  id  = req.params.id;
            const data = await this.modelName.findAll({
                where: {
                    categoryId: id
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
module.exports = new CourseCtl();