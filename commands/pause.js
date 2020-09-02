const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {
  if (message.member.voice.channel) {
    let song = await bot.player.pause(message.guild.id);
    message.channel.send(`${song.name} was paused.`);
  } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "pause"
}