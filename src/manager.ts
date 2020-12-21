//General imports
import { Manager } from 'erela.js';
import { MessageEmbed } from 'discord.js';

//Local imports
import Config from '../config.json';
import Logger from './logger';

const logger = new Logger();

const MusicManager: Function = (bot: any) => {

    bot.manager = new Manager({
        nodes: [
            {
                host: Config.lavalink.address, //Lavalinks host
                port: Config.lavalink.port, //Lavalinks port
                password: Config.lavalink.pass //Lavalinks pass
            },
        ],
        send(id: String, payload: any) {
            const guild = bot.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        },
    })
        .on("nodeConnect", (node: any) => logger.success(`Connected to lavalink! Node: ${node.options.identifier}`))
        .on("nodeError", (node: any, error: any) => logger.warn(`Node: ${node.options.identifier} had an error. Error: ${error.message}`))
        .on("trackStart", (player: any, track: any) => {
            let trackStartEmbed = new MessageEmbed()
            trackStartEmbed.setTitle('**Now Playing**')
            trackStartEmbed.setThumbnail(track.thumbnail);
            trackStartEmbed.setDescription(track.title)
            bot.channels.cache
                .get(player.textChannel)
                .send(trackStartEmbed);
        })
        .on("queueEnd", (player: any) => {
            bot.channels.cache
                .get(player.textChannel)
                .send("Queue has ended.");

            player.destroy();
        });
}

//Exports
export default MusicManager;