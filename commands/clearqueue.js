
module.exports.run = async (bot, message, args) => {
  if (message.member.voice.channel) {
    let queue = await bot.player.getQueue(message.guild.id);
    if (!queue) return message.channel.send("nothing playing right now.");
    bot.player.clearQueue(message.guild.id);
    message.channel.send("done.");
  } else {
    message.reply("you need to be in the voice channel first.");
  }
};

module.exports.help = {
  name: "clearqueue",
  aliases: ["clearq", "cq"],
  type: "user"
}