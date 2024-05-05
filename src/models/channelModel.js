import { generateUUID } from "../utils/uuid.js";

export class ChannelModel {
    constructor(name, members) {
        this.name = name;

        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        this.createdAt = currentTimestampInSeconds;
        this.members = members;
        this.channelId = generateUUID()
    }
}