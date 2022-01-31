import express from 'express';
import { logout, see, getEdit, postEdit, startGithubLogin, finishGithubLogin } from '../controllers/userController';
import { avatarUpload, protectorMiddleware } from '../middlewares';

const userRouter = express.Router();

userRouter.route('/edit-profile').all(protectorMiddleware).get(getEdit).post(avatarUpload.single('avatar'), postEdit);
userRouter.get('/logout', protectorMiddleware, logout);
userRouter.get('/github/start', startGithubLogin);
userRouter.get('/github/finish', finishGithubLogin);
userRouter.get('/:id', see);
export default userRouter;
