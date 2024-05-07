import { createClient } from 'redis'
import { UserRepository } from './repositories/user.js';
import { Repository } from 'redis-om'
import { ChannelRepository } from './repositories/channel.js';
import { MessageRepository } from './repositories/message.js';
import dotenv from 'dotenv';
dotenv.config();

const redisClient = createClient({
    url: process.env.REDIS_DB
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect()

let userRepository = new UserRepository();
userRepository.initRepo(redisClient);

let channelRepository = new ChannelRepository();
channelRepository.initRepo(redisClient);

let messageRepository = new MessageRepository();
messageRepository.initRepo(redisClient);
