import express from 'express';
import morgan from 'morgan';

const PORT = 4000;
const app = express();

//how to response get request

const loggerMiddleware = morgan('dev');
const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};
const privateMiddleware = (req, res, next) => {
  if (req.url === '/protected') {
    return res.send('<h1>Not Allowed</h1>');
  }
  console.log("Hi You'll pass");
  next();
};
const handleHome = (req, res) => {
  return res.send('HOME');
};
const handleProtected = (req, res) => {
  return res.send('Welcome private page');
};
app.use(logger, loggerMiddleware);
app.use(privateMiddleware);
app.get('/', handleHome);
app.get('/protected', handleProtected);
// application starts to listen request
const handleListening = () => console.log(`server on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
