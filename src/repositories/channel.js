import { Schema } from 'redis-om'
import { BaseRepository } from './base.js';
import { ChannelModel } from '../models/channelModel.js';

var instance = null;

const schema = new Schema('channel', {
    name: { type: 'string' },
    channelId: { type: 'string' },
    createdAt: { type: 'string' },
    members: { type: 'string[]' }
});


export class ChannelRepository extends BaseRepository {
    constructor() {
        if (!instance) {
            super("ChannelRepository", schema);
            instance = this;
        }

        return instance;
    }

    join = async (userId, channelId) => {
        let channel = await this.repository.search().where("channelId").equals(channelId).return.first();
        console.log(channel);
        if (channel) {
            if (!channel.members.includes(userId)) {
                channel.members.push(userId);
                return await super.update(channel);
            } else {
                return {
                    message: "Allready a member"
                };
            }
        } else {
            return {
                message: "Channel does not exist"
            };
        }
    }

    add = async (channelName, userId) => {
        let channel = new ChannelModel(channelName, [userId]);
        channel = await super.add(channel);
        return channel;
    }

    getAll = async () => {
        let channels = await super.getAll();
        return channels;
    }

    getByUser = async (userId) => {
        let channels = await this.repository.search().where("members").contain(userId).return.all();
        return channels;
    }

    isMember = async (userId, channelId) => {
        let channels = await this.repository.search().where("members").contain(userId).and('channelId').equals(channelId).return.all();
        return channels.length > 0;
    }
}
