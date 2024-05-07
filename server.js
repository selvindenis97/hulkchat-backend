import express from 'express';
import cors from 'cors';

import * as db from './src/db.js';

import userRoutes from './src/routes/userRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import channelRoutes from './src/routes/channelRoutes.js';
import messageRoutes from './src/routes/messageRoutes.js';
import { authenticateUser } from './src/middelware/authMiddleware.js';

// create an express app and use JSON
const app = express();
app.use(express.json());

app.use(cors());
// setup the root level GET to return name and version from package.json
app.get('/', (req, res) => {
    res.send({
        name: process.env.npm_package_name,
        version: process.env.npm_package_version,
    });
});

app.use('/api/user', authenticateUser, userRoutes);
app.use('/api/channel', authenticateUser, channelRoutes);
app.use('/api/message', authenticateUser, messageRoutes);
app.use('/api/auth', authRoutes);

// start listening
app.listen(process.env.PORT || 3000);

