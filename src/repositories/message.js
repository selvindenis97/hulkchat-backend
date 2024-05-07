import { Schema } from 'redis-om'
import { BaseRepository } from './base.js';
import { ChannelRepository } from './channel.js';
import { MessageModel } from '../models/messageModel.js';

var instance = null;

const schema = new Schema('message', {
    content: { type: 'string' },
    receiverId: { type: 'string' },
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

    add = async (receiverId, content, authorId, authorName, userId) => {
        let message = new MessageModel(receiverId, content, authorId, authorName, userId);
        message = await super.add(message);
        return message;
    }

    getUserMessages = async (receiverId, senderId) => {
        return await this.repository.search()
            .where("receiverId").equals(receiverId).and("authorId").equals(senderId)
            .or(search => search.where("receiverId").equals(senderId).and('authorId').equals(receiverId))
            .return.all();
    }

    getChannelMessages = async (receiverId) => {
        return await this.repository.search().where("receiverId").equals(receiverId).return.all();
    }
}
