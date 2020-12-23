//Local imports
import Logger from '../logger';
import Client from '../@types/Client.interface';

const logger = new Logger();

const Ready: Function = (bot: Client) => {
    bot.manager.init(bot.user.id);
    logger.success('Sound Box ready.')
}

//Exports
export default Ready;