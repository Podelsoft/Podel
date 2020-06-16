const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {
  
  let botvoice = message.guild.members.get('510483230151933964');
  
  if (message.member.voiceChannel) {
    if (!botvoice.voiceChannel) return; 
      message.channel.send("disconnected.");
      message.member.voiceChannel.leave(); 
    } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "pissoff",
  aliases: ['disconnect', 'leave', 'fuckoff', 'die']
}