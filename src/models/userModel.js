import { generateUUID } from "../utils/uuid.js";
export class UserModel {
    constructor(username, password, userId) {
        this.username = username;
        this.password = password;
        this.userId = userId || generateUUID();
    }
}