/**
 *
 * @interface {} The discord bot client.
 */
interface Client {
    on: Function, //The on emmiter
    user: any, //This bot user its self
    guilds: any, //All the guilds that the bot is in
    channels: any, //All the channels that the bot has access to
    /**
     * @param {any}  Music The music core. From 'erela.js'.
     */
    manager?: any //Manager {optional} This music core
};

//Exports
export default Client;