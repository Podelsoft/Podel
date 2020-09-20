
module.exports.run = async (bot, message, args) => {
  if (message.member.voice.channel) {
    let song = await bot.player.skip(message.guild.id);
    message.channel.send(`${song.name} was skipped.`);
  } else {
    message.reply("you need to be in the voice channel first.");
  }
};

module.exports.help = {
  name: "skip",
  type: "user"
};
