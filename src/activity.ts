//Local imports
import Client from './@types/Client.interface';

const Activity: Function = (bot: Client) => {
    bot.user.setActivity('Music | !help', { type: "PLAYING" })
}

//Exports
export default Activity;