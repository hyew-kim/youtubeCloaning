import express from 'express';
import morgan from 'morgan';
import rootRouter from './routes/rootRouter';
import userRouter from './routes/userRouter';
import videoRouter from './routes/videoRouter';

const app = express();

//how to response request
const logger = morgan('dev');
app.use(logger);

app.set('view engine', 'pug');
app.set('views', process.cwd() + '/src/views');
app.use(express.urlencoded({ extended: true }));
app.use('/', rootRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

export default app;
