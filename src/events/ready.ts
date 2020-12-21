//Local imports
import Logger from '../logger';

const logger = new Logger();

const Ready: Function = (bot: any) => {
    bot.manager.init(bot.user.id);
    logger.success('Sound Box ready.')
}

//Exports
export default Ready;