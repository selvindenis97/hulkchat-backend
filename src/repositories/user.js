import { Schema } from 'redis-om'
import { BaseRepository } from './base.js';

var instance = null;

const schema = new Schema('user', {
    username: { type: 'string' },
    password: { type: 'string' },
    status: { type: 'string' },
    lastActive: { type: 'date' }
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
        return await this.repository.search().where("username").equals(username).return.all();
    }

    getAllUsers = async () => {
        console.log("get all")
        return await this.repository.search().return.all();
    }

    add = async (data) => {
        console.log("data")
        let existingUser = await this.getByUser(data.username);
        if (existingUser.length > 0) {
            return {
                message: "User exists with that username."
            };
        } else {
            return await super.add(data);
        }
    }
}
