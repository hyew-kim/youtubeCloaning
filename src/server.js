import express from 'express';
const PORT = 4000;
const app = express();

//how to response get request

const handleLogin = (req, res) => {
  return res.send('This is login page');
};
app.get('/', (req, res) => {
  return res.end();
});
app.get('/login', handleLogin);
// application starts to listen request
const handleListening = () => console.log(`server on port http://localhost:${PORT}`);
app.listen(PORT, handleListening);
