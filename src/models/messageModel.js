export class MessageModel {
    constructor(receiverId, content, authorId, authorName, userId) {
        this.receiverId = receiverId;
        this.content = content;
        this.authorId = authorId;
        this.authorName = authorName;

        const currentTimestampInSeconds = Math.floor(Date.now() / 1000);
        this.createdAt = currentTimestampInSeconds;
    }
}