import express from 'express';
import * as messageController from '../controllers/messageController.js';

const router = express.Router();

router.post('/send', messageController.sendMessage);

router.post('/user', messageController.getUserMessages);

router.post('/channel', messageController.getChannelMessages);

export default router;