import express from 'express';
import * as messageController from '../controllers/messageController.js';

const router = express.Router();

router.post('/send', messageController.sendMessage);

router.post('/messages', messageController.getMessages);

export default router;