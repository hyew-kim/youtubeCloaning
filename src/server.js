import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
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

app.use(
  session({
    secret: 'Hello!',
    resave: true,
    saveUninitialized: true,
  })
);
//session이라는 middleware가 브라우저에 cookie를 전송
app.use(localMiddleware);
app.use('/', rootRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

export default app;
