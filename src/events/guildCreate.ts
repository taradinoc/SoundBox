//General imports
import { MessageEmbed } from 'discord.js';

//Local imports
import Guild from '../database/models/guild.model';
import Logger from '../logger';
import Client from '../@types/Client.interface';
import GuildType from '../@types/Guild.interface';

const logger = new Logger();

const guildCreate: Function = (bot: Client) => {
    bot.on('guildCreate', (guild: any) => {
        try {
            let channelID;
            let channels = guild.channels.cache;

            channelLoop:
            for (let key in channels) {
                let c = channels[key];
                if (c[1].type === "text") {
                    channelID = c[0];
                    break channelLoop;
                }
            }

            let channel = guild.channels.cache.get(guild.systemChannelID || channelID);
            const embed = new MessageEmbed();
            embed.setTitle('SoundBox')
            embed.setDescription('Thanks for using SoundBox Music! To get started, join a voice channel and type `!play <song name>`. If you with to change your prefix please type `!prefix <prefix>!` To see all commands run `!help`')
            embed.setFooter('♪♪');
            channel.send(embed);
        } catch (err) {
            logger.warn('Failed to send the welcome message')
        } finally {
            try {
                const newGuild: GuildType = new Guild({
                    id: guild.id,
                    prefix: '!'
                }) as GuildType;
                newGuild.save();
            } catch (err) {
                logger.error('Failed to create a new database value for a guild.')
            } finally {
                logger.success('Successfully created a new guilds database.')
            }
        }
    })
}

//Exports
export default guildCreate;