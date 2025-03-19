import BaseController from "./baseCtl";
import db from '../models'
class WordCtl extends BaseController{
    constructor(){
        super(db.Word)
    } 
    getByIds = async (req, res) => {
        const wordIds = req.body.wordIdArray;
        try{
          const data = await this.modelName.findAll({
            where: {
              id: wordIds
            }
          });
          return res.status(200).json({
            error: false,
            message: 'get all by id array success',
            data: data
          });
        } catch(error){
            console.log(error)
            return res.status(500).json({
              error: true,
              message: error.message
            });
          }
      }
      
    
}
module.exports = new WordCtl();