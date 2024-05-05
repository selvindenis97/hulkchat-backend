import { createClient } from 'redis'
import { UserRepository } from './repositories/user.js';
import { Repository } from 'redis-om'
import { ChannelRepository } from './repositories/channel.js';
import { MessageRepository } from './repositories/message.js';

const redisClient = createClient({
    url: 'redis://127.0.0.1:6379'
});
redisClient.on('error', (err) => console.log('Redis Client Error', err));
await redisClient.connect()

let userRepository = new UserRepository();
userRepository.initRepo(redisClient);

let channelRepository = new ChannelRepository();
channelRepository.initRepo(redisClient);

let messageRepository = new MessageRepository();
messageRepository.initRepo(redisClient);
