//General imports
import Discord from 'discord.js';

//Local imports
import Guild from '../database/models/guild.model';
import Logger from '../logger';

const logger = new Logger();

const Queue = (bot: any) => {
    bot.on('message', async (message: any) => {
        try {
            const guild: any = await Guild.findOne({
                id: message.guild.id,
            })
            const prefix: String = guild.prefix;
            if (message.content.startsWith(`${prefix}queue`)) {
                if (!message.member.voice.channel) {
                    message.reply("You must be in a voice channel to do this.");
                    return;
                }
                const player = bot.manager.create({
                    guild: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id,
                });
                const queue = new Discord.MessageEmbed();
                queue.setTitle('__**QUEUE**__')
                queue.addField('\u200b', '**Now Playing**')
                queue.addField('\u200b', player.queue.current.title)
                queue.addField('\u200b', '**Next Up**')
                await player.queue.forEach((current: any) => {
                    console.log(current)
                    queue.addField('\u200b', current.title)
                })
                message.channel.send(queue)
            } else {
                return null;
            }
        } catch (err) {
            logger.warn(`An error occured whilst skipping a song in ${message.guild.id}`)
            message.reply('An error occured.')
        }
    })
}

//Exports
export default Queue;