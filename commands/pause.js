const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {
  if (message.member.voiceChannel) {
    const connection = await message.member.voiceChannel.join();
    const dispatcher = connection.playStream(ytdl(args.join(' '), { filter: 'audioonly' }));

      message.channel.send("paused.");
      dispatcher.pause();
  } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "pause"
}