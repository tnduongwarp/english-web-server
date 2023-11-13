import BaseController from "./baseCtl";
import db from '../models'
class CategoryCtl extends BaseController{
    constructor(){
        super(db.Category)
    } 
}
module.exports = new CategoryCtl();