
module.exports.run = async (bot, message, args) => {
  if (message.member.voice.channel) {
    if (args[0] === "on") {
      bot.player.setRepeatMode(message.guild.id, true);
      let song = await bot.player.nowPlaying(message.guild.id);
      message.channel.send(`${song.name} | 🔁 **on**`);
    } else if (args[0] === "off") {
      bot.player.setRepeatMode(message.guild.id, false);
      let song = await bot.player.nowPlaying(message.guild.id);
      message.channel.send(`${song.name} | 🔁 **off**`);
    }
  } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "repeat",
  type: "user"
};