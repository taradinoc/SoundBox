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
                const help = new Discord.MessageEmbed();
                help.setTitle('Help')
                help.addField(`${guild.prefix}play <song>`, 'This will play a song to your channel.')
                help.addField(`${guild.prefix}skip <song>`, 'This will skip to the next song in the queue.')
                help.addField(`${guild.prefix}stop <song>`, 'This will stop the current playin gsong.')
                help.addField(`${guild.prefix}queue <song>`, 'This will show you the current queue.')
                help.addField(`${guild.prefix}prefix <song>`, 'This will allow you to change the prefix.')
            }
        } catch (err) {
            logger.warn(`An error occured whilst sending the help command in in ${message.guild.id}`)
            message.reply('An error occured.')
        }
    })
}

//Exports
export default Queue;