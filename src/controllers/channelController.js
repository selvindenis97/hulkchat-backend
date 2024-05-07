import { ChannelRepository } from "../repositories/channel.js";

const channelRepository = new ChannelRepository()

// Controller function to create new channel
export const create = async (req, res, next) => {
    try {
        let result = await channelRepository.add(req.body.name, req.user.userId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(false);
    }
};

// Controller function to join a channel
export const join = async (req, res, next) => {
    try {
        let result = await channelRepository.join(req.user.userId, req.body.channelId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(false);
    }
};

// Controller function to get all channels
export const getAll = async (req, res, next) => {
    try {
        let result = await channelRepository.getAll();
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(false);
    }
};

// Controller function to get all channels
export const getByUser = async (req, res, next) => {
    try {
        let result = await channelRepository.getByUser(req.user.userId);
        res.json(result);
    } catch (err) {
        console.log(err);
        res.json(false);
    }
};

