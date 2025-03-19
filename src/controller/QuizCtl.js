import BaseController from "./baseCtl";
import db from '../models'
class QuizCtl extends BaseController{
    constructor(){
        super(db.Quiz)
    }
   getByLessonId = async (req, res) => {
    try{
        const lessonId = req.params.id;
        const quiz = await db.Quiz.findOne({
            where:{ lessonId: lessonId}
        })
        let questionIds = quiz.questionIds.split(',');
        const questions = await db.Question.findAll({
            where: { id: questionIds}
        })
        res.status(200).json({
            error: false,
            mesage: 'get by lessonId successfully',
            quiz: questions
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            error: true,
            message: err.message
        })
    }
    
   }

   addQuiz = async (req,res) => {
    try {
        const {questions, lessonId} = req.body;
        console.log(questions)
        let insertQues = await db.Question.bulkCreate(questions);
        console.log(insertQues)
        insertQues = insertQues.map(it => (it.id)).join(',');
        let insertQuiz =await this.modelName.create({
            lessonId,
            questionIds: insertQues
        });
        res.status(200).json({
            error: false,
            mesage: 'add quiz successfully',
            quiz: insertQuiz
        })
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: true,
            message: err.message
        })
    }
   }
}
module.exports = new QuizCtl();