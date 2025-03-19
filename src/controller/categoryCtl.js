import BaseController from "./baseCtl";
import db from '../models'
class CategoryCtl extends BaseController{
    constructor(){
        super(db.Category)
    } 
    editStatus = async (req,res) => {
        try {
            const { categoryId, status} = req.body;
            let category = await this.modelName.findOne({
                where:{
                    id: categoryId
                }
            });
            console.log(category)
            if(category){
                category.isActive = status? 'active':'inactive';
                await category.save();
                res.status(200).json({
                    error: false,
                    message: "Updated"
                })
            }
        } catch (error) {
             console.log(error)
            res.status(500).json({
                error: true,
                message: error.message
            })
        }
    }
}
module.exports = new CategoryCtl();