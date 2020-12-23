//Local imports
import Client from '../@types/Client.interface';

const Raw: Function = (bot: Client) => {
    bot.on("raw", (d: any) => bot.manager.updateVoiceState(d));
}

//Exports
export default Raw;