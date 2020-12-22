//General imports
import Guild from '../database/models/guild.model';
import Logger from '../logger';

//Local imports
import Client from '../@types/Client.interface';
import Message from '../@types/Message.interface';
import GuildType from '../@types/Guild.interface';

const logger = new Logger();

const Prefix = async (bot: Client) => {
    bot.on('message', async (message: Message) => {
        const guild: GuildType = await Guild.findOne({
            id: message.guild.id,
        }) as GuildType;
        const prefix: String = guild.prefix;
        if (message.content.toLowerCase().startsWith(`${prefix}prefix`)) {
            let args = message.content.substring(prefix.length).split(' ');
            if (!args[1]) {
                return message.reply('Please provide a prefix.')
            }
            try {
                await guild.updateOne({ prefix: args[1] })
                message.reply(`Your prefix has been updated to ${args[1]}`)
            } catch (err) {
                logger.error('Unable to change a guilds prefix.')
                message.reply('An error occured.')
            }
            return;
        }
    })
}

//Exports
export default Prefix;