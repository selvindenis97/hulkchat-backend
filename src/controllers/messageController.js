import { MessageRepository } from '../repositories/message.js';

const messageRepository = new MessageRepository()

// Controller function to get all messages
export const sendMessage = async (req, res, next) => {
    try {
        let result = await messageRepository.add(req.body.channelId, req.body.content, req.user.userId, req.user.username);
        res.json(result);
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Controller function to create a new message
export const getMessages = async (req, res, next) => {
    try {
        let result = await messageRepository.getByChannel(req.body.channelId, req.user.userId);
        res.json(result);
    } catch (err) {
        console.log(err);
        return false;
    }
};