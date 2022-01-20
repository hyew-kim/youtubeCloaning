import express from 'express';
import { getUpload, postUpload, getEdit, remove, watch, postEdit } from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get('/:id([0-9a-f]{24})', watch);
videoRouter.route('/:id([0-9a-f]{24})/edit').get(getEdit).post(postEdit);
videoRouter.get('/:id([0-9a-f]{24})/remove', remove);
videoRouter.get('/upload', getUpload);
videoRouter.post('/upload', postUpload);

export default videoRouter;
//controller -> route 순서로 작업하면 편한듯?
