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
        return await userRepository.getAllUsers();
    } catch (err) {
        console.log(err);
        return false;
    }
};