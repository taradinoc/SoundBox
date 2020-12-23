//General imports
import Discord from 'discord.js';

//Local imports
import * as Config from '../config.json';
import Logger from './logger';

//All module imports - barrel
import {
    Connect,
    guildCreate,
    MusicManager,
    Ready,
    Raw,
    Play,
    Skip,
    Stop,
    Queue,
    Prefix,
    Help,
    Activity,
    Volume
} from './barrel';

//Constants
const bot = new Discord.Client();
const logger = new Logger();

//Displaying banner
logger.banner('Sound Box')

bot.on('ready', () => {
    logger.success('Logged into bot!')
    //Loading all modules
    Connect(bot);
    guildCreate(bot);
    MusicManager(bot);
    Ready(bot);
    Raw(bot);
    Play(bot);
    Skip(bot);
    Stop(bot);
    Queue(bot);
    Prefix(bot);
    Help(bot);
    Activity(bot);
    Volume(bot);
})

//Logging into the bot
bot.login(Config.bot.token);