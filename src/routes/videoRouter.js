import express from 'express';
import { edit, remove, watch } from '../controllers/videoController';

const videoRouter = express.Router();

videoRouter.get('/watch', watch);
videoRouter.get('/edit', edit);
videoRouter.get('/remove', remove);

export default videoRouter;
