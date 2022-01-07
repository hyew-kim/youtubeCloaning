import express from 'express';
import { join, login } from '../controllers/userController';
import { trending, search } from '../controllers/videoController';
// 모든 파일은 하나의 모듈이다. 파일 안에서 모든 코드가 돌아가도록 환경을 만들어줘야한다
const globalRouter = express.Router();

globalRouter.get('/', trending);
globalRouter.get('/join', join);
globalRouter.get('/login', login);
globalRouter.get('/search', search);
export default globalRouter;
