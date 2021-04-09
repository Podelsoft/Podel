const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  if (message.member.voice.channel) {

    let isPlaying = bot.player.isPlaying(message.guild.id);

    if (!isPlaying) {
      await message.channel.send('nothing is playing, smell off.');
    } else {
      let time = ms(args[0]);
      if (isNaN(time)) return message.channel.send("valid format: `p!goto <h/m/s>`");

      let track = await bot.player.nowPlaying(message.guild.id);

      await bot.player.seek(message.guild.id, time).catch(err => {
        return message.channel.send(error.message);
      });

      message.channel.send(`Moving ${args[0]} (${track.name})`);
    }
  } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "forward",
  aliases: ["fwd", "goto", "seek"],
  type: "user"
};