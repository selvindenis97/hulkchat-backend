export class MessageModel {
    constructor(channelId, content, authorId, authorName) {
        this.channelId = channelId;
        this.content = content;
        this.authorId = authorId;
        this.authorName = authorName;

        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        this.createdAt = currentTimestampInSeconds;
    }
}