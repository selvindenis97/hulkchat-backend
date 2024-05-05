import express from 'express';
import * as userController from '../controllers/userController.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const user = await userController.getAllUsers();
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const user = await userController.addUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        next(err);
    }
});

export default router;