import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import rootRouter from './routes/rootRouter';
import userRouter from './routes/userRouter';
import videoRouter from './routes/videoRouter';
import { localMiddleware } from './middlewares';

const app = express();

//how to response request
const logger = morgan('dev');
app.use(logger);

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
//app.use(middlerware이름)
app.use(express.urlencoded({ extended: true }));

//session이라는 middleware가 브라우저에 cookie를 전송 by express-session
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    //항상 session에 쿠키 save
    saveUninitialized: false,
    /*cookie: {
      maxAge: 20 * 1000,
    },*/
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);
//req에 있는session의 정보를 res.locals로 옮김
app.use(localMiddleware);
// /uploads로 가려고 한다면 uploads폴더 브라우저에게 공개
app.use('/uploads', express.static('uploads'));
app.use('/', rootRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

export default app;
