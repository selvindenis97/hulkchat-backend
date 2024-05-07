import { MessageRepository } from '../repositories/message.js';

const messageRepository = new MessageRepository()

// Controller function to get all messages
export const sendMessage = async (req, res, next) => {
    try {
        let result = await messageRepository.add(req.body.receiverId, req.body.content, req.user.userId, req.user.username, req.body.userId);
        res.json(result);
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const getUserMessages = async (req, res, next) => {
    try {
        let result = await messageRepository.getUserMessages(req.user.userId, req.body.receiverId);
        res.json(result);
    } catch (err) {
        console.log(err);
        return false;
    }
};

export const getChannelMessages = async (req, res, next) => {
    try {
        let result = await messageRepository.getChannelMessages(req.body.receiverId);
        res.json(result);
    } catch (err) {
        console.log(err);
        return false;
    }
};