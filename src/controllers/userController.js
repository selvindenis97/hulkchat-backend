import { UserRepository } from '../repositories/user.js';

const userRepository = new UserRepository()

// Controller function to get all messages
export const addUser = async (req, res, next) => {
    try {
        return await userRepository.add(req);
    } catch (err) {
        console.log(err);
        return false;
    }
};

// Controller function to create a new message
export const getAllUsers = async (req, res, next) => {
    try {
        let users = await userRepository.getAllUsers(req.user.userId);
        res.json(users)
    } catch (err) {
        console.log(err);
        return false;
    }
};