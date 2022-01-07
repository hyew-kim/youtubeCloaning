import express from 'express';
import morgan from 'morgan';
import globalRouter from './routes/globalRouter';
import userRouter from './routes/userRouter';
import videoRouter from './routes/videoRouter';

const PORT = 4000;
const app = express();

//how to response get request

const logger = morgan('dev');
app.use(logger);

app.use('/', globalRouter);
app.use('/videos', videoRouter);
app.use('/users', userRouter);

// application starts to listen request
const handleListening = () => console.log(`server listening ✅ on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
