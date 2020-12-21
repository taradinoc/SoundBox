//Local imports
import Guild from '../database/models/guild.model';
import Logger from '../logger';

const logger = new Logger();

const Stop = (bot: any) => {
    bot.on('message', async (message: any) => {
        try {
            const guild: any = await Guild.findOne({
                id: message.guild.id,
            })
            const prefix: String = guild.prefix;
            if (message.content.startsWith(`${prefix}stop`)) {
                if (!message.member.voice.channel) {
                    message.reply("You must be in a voice channel to do this.");
                    return;
                }
                const player = bot.manager.create({
                    guild: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id,
                });
                player.destroy();
            } else {
                return null
            }
        } catch (err) {
            logger.warn(`An error occured whilst stopping a song in ${message.guild.id}`)
            message.reply('An error occured.')
        }
    })
}

//Exports
export default Stop;