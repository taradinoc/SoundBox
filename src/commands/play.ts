//General imports
import { Manager } from 'erela.js';

//Local imports
import Guild from '../database/models/guild.model';
import Logger from '../logger';
import Client from '../@types/Client.interface';
import Message from '../@types/Message.interface';
import GuildType from '../@types/Guild.interface';

const logger = new Logger();

const Play: Function = (bot: Client) => {
    bot.on('message', async (message: Message) => {
        try {
            const guild: GuildType = await Guild.findOne({
                id: message.guild.id,
            }) as GuildType;
            const prefix: String = guild.prefix;
            if (message.content.startsWith(`${prefix}play`)) {
                let args = message.content.substring(prefix.length).split(' ');
                if (!args[1]) {
                    message.reply("Please provide a url or query.");
                    return;
                }
                if (!message.member.voice.channel) {
                    message.reply("You must be in a voice channel to do this.");
                    return;
                }
                const res = await bot.manager.search(
                    message.content.slice(6),
                    message.author
                );
                const player = bot.manager.create({
                    guild: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id,
                });
                player.connect();
                player.queue.add(res.tracks[0]);
                message.channel.send(`Enqueuing track ${res.tracks[0].title}.`);
                if (!player.playing && !player.paused && !player.queue.size)
                    player.play();
                if (
                    !player.playing &&
                    !player.paused &&
                    player.queue.totalSize === res.tracks.length
                )
                    player.play();
                logger.success(`Successfully started playing ${res.tracks[0].title} to ${message.guild.id}`);
            } else {
                return null;
            }
        } catch (err) {
            message.reply('An error occured.')
            logger.warn(`An error occured whist playing to ${message.guild.id}`)
        }
    })
}

//Exports
export default Play;