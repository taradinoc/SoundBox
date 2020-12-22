//Local imports
import Guild from '../database/models/guild.model';
import Logger from '../logger';
import Client from '../@types/Client.interface';
import Message from '../@types/Message.interface';
import GuildType from '../@types/Guild.interface';

const logger = new Logger();

const Volume = (bot: Client) => {
    bot.on('message', async (message: Message) => {
        try {
            const guild: GuildType = await Guild.findOne({
                id: message.guild.id,
            }) as GuildType;
            const prefix: String = guild.prefix;
            if (message.content.startsWith(`${prefix}volume`)) {
                let args = message.content.substring(prefix.length).split(' ');
                if (!message.member.voice.channel) {
                    message.reply("You must be in a voice channel to do this.");
                    return;
                }
                try {
                    const player = bot.manager.players.get(message.guild.id);
                    if (!player) {
                        return message.reply('Nothing playing at the moment.')
                    }
                    if (!args[1]) return message.channel.send(`Current volume: **${player.volume}%**`);
                    if (isNaN(Number(args[1]))) return message.reply('Please provide a valid number.')
                    if (Number(args[1]) <= 0 || Number(args) > 100) return message.channel.send("You may set the volume 1-100");
                    player.setVolume(Number(args[1]));
                    message.reply(`Ive set the volume to ${Number(args[1])}`);
                } catch (err) {
                    logger.warn(`An error occured whilst setting volume  in ${message.guild.id}`)
                    message.reply('An error occured.')
                }
            } else {
                return null;
            }
        } catch (err) {
            logger.warn(`An error occured whilst settin volume in ${message.guild.id}`)
            message.reply('An error occured.')
        }
    })
}

//Exports
export default Volume;