import BaseController from "./baseCtl";
import db from '../models'
class WordCtl extends BaseController{
    constructor(){
        super(db.Word)
    } 
    
}
module.exports = new WordCtl();