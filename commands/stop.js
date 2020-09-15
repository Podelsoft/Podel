
module.exports.run = async (bot, message, args) => {
  let botvoice = message.guild.members.cache.get(bot.user.id);
  
  if (message.member.voice.channel) {
    if (!botvoice.voice.channel) return; 
      bot.player.stop(message.guild.id);
      message.member.voice.channel.leave();
      message.channel.send("disconnected.");
    } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "stop",
  aliases: ["eatshit", "die", "disconnect", "leave", "fuckoff"]
}