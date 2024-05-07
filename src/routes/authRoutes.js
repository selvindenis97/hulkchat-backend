import express from 'express';
import * as authController from '../controllers/authController.js';

const router = express.Router();

router.post('/login', async (req, res, next) => {
    try {
        const user = await authController.login(req.body);
        res.json(user);
    } catch (err) {
        next(err);
    }
});

router.post('/register', authController.register);

export default router;