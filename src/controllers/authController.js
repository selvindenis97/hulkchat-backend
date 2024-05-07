import { EntityId } from 'redis-om';
import { UserRepository } from '../repositories/user.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const userRepository = new UserRepository()
const secretKey = process.env.MY_SECRET;

// Controller function to validate user
export const login = async (req, res, next) => {
    try {
        let user = await userRepository.validate(req.username, req.password);
        if (user.length > 0) {
            user = user[0];
            const payload = {
                userId: user.userId,
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
        let user = await userRepository.add(req.body);
        res.status(201).json(user);
    } catch (err) {
        console.log(err);
        next(err);
    }
};