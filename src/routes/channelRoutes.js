import express from 'express';
import * as channelController from '../controllers/channelController.js';

const router = express.Router();

router.post('/create', channelController.create);

router.post('/join', channelController.join);

router.get('/all', channelController.getAll);

router.get('/mine', channelController.getByUser);

export default router;