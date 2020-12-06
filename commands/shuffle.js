module.exports.run = async(bot, message, args) => {
    if (message.member.voice.channel) {
        bot.player.shuffle(message.guild.id);
          message.channel.send(`🔀 **suffled the queue**`);
      } else {
        message.reply("you need to join a voice channel first.");
      }
};

module.exports.help = {
    name: "shuffle",
    type: "user"
};