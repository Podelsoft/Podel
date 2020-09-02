const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if (message.member.voice.channel) {

    if (isNaN(args[0])) return;
    if (!args[0]) return message.channel.send('you need to set the volume to some crap number, piss off.');
    if (args[0] > 1000) return;
    if (args[0] < 0) return;
    
    bot.player.setVolume(message.guild.id, parseInt(args[0]));
    
    message.channel.send(`Volume set to: ${args[0]}%`)
    
  } else {
    message.reply("you need to be in the voice channel first.");
  }
};

module.exports.help = {
  name: "volume"
}