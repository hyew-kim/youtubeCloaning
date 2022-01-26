import express from 'express';
import { getJoin, postJoin, getLogin, postLogin } from '../controllers/userController';
import { home, search } from '../controllers/videoController';
import { publicOnlyMiddleware } from '../middlewares';
// 모든 파일은 하나의 모듈이다. 파일 안에서 모든 코드가 돌아가도록 환경을 만들어줘야한다
const rootRouter = express.Router();

rootRouter.get('/', home);
rootRouter.route('/join').all(publicOnlyMiddleware).get(getJoin).post(postJoin);
rootRouter.route('/login').all(publicOnlyMiddleware).get(getLogin).post(postLogin);
rootRouter.get('/search', search);
export default rootRouter;
