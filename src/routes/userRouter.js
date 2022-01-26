import express from 'express';
import { remove, logout, see, getEdit, postEdit } from '../controllers/userController';
import { protectorMiddleware } from '../middlewares';

const userRouter = express.Router();

userRouter.route('/edit-profile').all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter.get('/remove', remove);
userRouter.get('/logout', protectorMiddleware, logout);
userRouter.get('/:id', see);
export default userRouter;
