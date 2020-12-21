//General imports
import { Client } from 'discord.js';

//Local imports
import * as Config from '../config.json';
import Logger from './logger';
import Connect from './database/connect';
import guildCreate from './events/guildCreate';
import MusicManager from './manager';
import Ready from './events/ready';
import Raw from './events/raw';
import Play from './commands/play';
import Skip from './commands/skip';
import Stop from './commands/stop';
import Queue from './commands/queue';
import Prefix from './commands/prefix';

//Constants
const bot = new Client();
const logger = new Logger();

//Displaying banner
logger.banner('Sound Box')

bot.on('ready', () => {
    logger.success('Logged into bot!')
    Connect();
    guildCreate(bot);
    MusicManager(bot);
    Ready(bot);
    Raw(bot);
    Play(bot);
    Skip(bot);
    Stop(bot);
    Queue(bot);
    Prefix(bot);
})

//Logging into the bot
bot.login(Config.bot.token);