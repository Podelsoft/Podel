module.exports.run = async (bot, message, args) => {
    if (message.member.voice.channel) {
        let isPlaying = bot.player.isPlaying(message.guild.id);

        if (isPlaying) {
            if (isNaN(args[0])) return message.channel.send("you need to use the song's number from `p!queue`");
            if (args[0] < 0) return message.channel.send("not a valid number.");
            if ((args[0] % 1) !== 0) return message.channel.send("not a valid number.");
            bot.player.remove(message.guild.id, Number(args[0])).then(() => {
                message.channel.send(`removed song **${args[0]}** from the queue.`);
            }).catch(err => {
                message.channel.send(`couldn't find song. (${err})`);
            });
        } else {
            message.channel.send("nothing is playing.");
        }
    }
};

module.exports.help = {
    name: "remove",
    aliases: ["r", "rm"],
    type: "user"
};