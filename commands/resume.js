
module.exports.run = async (bot, message, args) => {
  if (message.member.voice.channel) {
    let song = await bot.player.resume(message.guild.id);
    message.channel.send(`${song.name} was resumed.`);
  } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "resume"
};