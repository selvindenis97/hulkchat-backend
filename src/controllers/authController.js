import { EntityId } from 'redis-om';
import { UserRepository } from '../repositories/user.js';
import jwt from 'jsonwebtoken';

const userRepository = new UserRepository()
const secretKey = '84D7A5DDC9C95F52ECDAA31D3286B';

// Controller function to validate user
export const login = async (req, res, next) => {
    try {
        console.log(req)
        let user = await userRepository.validate(req.username, req.password);
        if (user.length > 0) {
            user = user[0];
            const payload = {
                userId: user[EntityId],
                username: user.username
            };

            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });
            user.jwt = token;
            return user;

        }
        return false;
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Controller function to register new user
export const register = async (req, res, next) => {
    try {
        return await userRepository.add(req);
    } catch (err) {
        console.log(err);
        return false;
    }
};