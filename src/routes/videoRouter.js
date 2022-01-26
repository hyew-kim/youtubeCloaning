import express from 'express';
import { getUpload, postUpload, getEdit, remove, watch, postEdit } from '../controllers/videoController';
import { protectorMiddleware } from '../middlewares';

const videoRouter = express.Router();

videoRouter.get('/:id([0-9a-f]{24})', watch);
videoRouter.route('/:id([0-9a-f]{24})/edit').all(protectorMiddleware).get(getEdit).post(postEdit);
videoRouter.all(protectorMiddleware).get('/:id([0-9a-f]{24})/remove', remove);
videoRouter.route('/upload').all(protectorMiddleware).get(getUpload).post(postUpload);

export default videoRouter;
//controller -> route 순서로 작업하면 편한듯?
