import express from 'express';
import { getUpload, postUpload, getEdit, remove, watch, postEdit } from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get('/upload', getUpload);
videoRouter.post('/upload', postUpload);
videoRouter.get('/:id', watch);
videoRouter.route('/:id/edit').get(getEdit).post(postEdit);
videoRouter.get('/:id/remove', remove);

export default videoRouter;
//controller -> route 순서로 작업하면 편한듯?
