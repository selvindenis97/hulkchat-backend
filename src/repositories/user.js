import { EntityId, Schema } from 'redis-om'
import { BaseRepository } from './base.js';
import { UserModel } from '../models/userModel.js';

var instance = null;

const schema = new Schema('user', {
    username: { type: 'string' },
    password: { type: 'string' },
    userId: { type: 'string' }
});


export class UserRepository extends BaseRepository {
    constructor() {
        if (!instance) {
            super("UserRepository", schema);
            instance = this;
        }

        return instance;
    }

    validate = async (username, password) => {
        return await this.repository.search().where("username").equals(username).and("password").equals(password).return.all();
    }

    getByUser = async (username) => {
        try {
            let user = await this.repository.search().where("username").equals(username).return.all();
            return user;
        } catch (err) {
            return [];
        }
    }

    getAllUsers = async (requestingUserId) => {
        let users = await this.repository.search().return.all();
        users = users.filter((user) => user.userId != requestingUserId);
        return users;
    }

    add = async (data) => {
        let existingUser = await this.getByUser(data.username);
        if (existingUser.length > 0) {
            return {
                message: "User exists with that username."
            };
        } else {
            let user = new UserModel(data.username, data.password)
            return await super.add(user);
        }
    }
}
