import user from './user.js';
import auth from './auth.js';
import refreshToken from './refreshToken.js';
import forgotPassWord from './forgot-pw.js';
import category from './category.js';
import course from './course.js'
import lesson from './lesson.js';
import word from './word.js';
import quiz from './quiz.js'
export default function route(app){
    app.use(function(req, res, next) {
        res.header(
          "Access-Control-Allow-Headers",
          "x-access-token, Origin, Content-Type, Accept"
        );
        next();
      });
      app.use('/user',user );
      app.use('/auth', auth);
      app.use('/auth/refresh-token', refreshToken);
      app.use('/forgot-pw', forgotPassWord);
      app.use('/category',category);
      app.use('/lesson', lesson);
      app.use('/course',course);
      app.use('/word', word);
      app.use('/quiz', quiz);
}