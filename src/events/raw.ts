const Raw: Function = (bot: any) => {
    bot.on("raw", (d: any) => bot.manager.updateVoiceState(d));
}

//Exports
export default Raw;