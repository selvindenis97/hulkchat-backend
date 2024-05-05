import { Schema } from 'redis-om'
import { BaseRepository } from './base.js';
import { ChannelRepository } from './channel.js';
import { MessageModel } from '../models/messageModel.js';

var instance = null;

const schema = new Schema('message', {
    content: { type: 'string' },
    channelId: { type: 'string' },
    createdAt: { type: 'date' },
    authorName: { type: 'string' },
    authorId: { type: 'string' },
});


export class MessageRepository extends BaseRepository {
    constructor() {
        if (!instance) {
            super("MessageRepository", schema);
            instance = this;
        }

        return instance;
    }

    add = async (channelId, content, authorId, authorName) => {
        console.log("data")
        let channelRepo = new ChannelRepository();
        let isMember = await channelRepo.isMember(authorId, channelId);
        if (isMember) {
            let message = new MessageModel(channelId, content, authorId, authorName);
            message = await super.add(message);
            return message;
        }
        return {
            message: "You are not member of this channel"
        };
    }

    getByChannel = async (channelId, userId) => {
        let channelRepo = new ChannelRepository();
        let isMember = await channelRepo.isMember(userId, channelId);
        if (isMember) {
            return await this.repository.search().where("channelId").equals(channelId).return.all();
        }
        return {
            message: "You are not member of this channel"
        };
    }
}
