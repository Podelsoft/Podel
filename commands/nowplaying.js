const Discord = require("discord.js");
let config = require('../config.json'),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  function ms(s) {

    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }

    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;

    return pad(hrs) + ':' + pad(mins) + ':' + pad(secs);
  }

  let podelemoji = bot.emojis.cache.find(emoji => emoji.name === `podel`);

  if (message.member.voice.channel) {

    let isPlaying = bot.player.isPlaying(message.guild.id);

    if (!isPlaying) {
      await message.channel.send('nothing is playing, smell off.');
    } else {

      let track = await bot.player.nowPlaying(message.guild.id);

      let time = ms(bot.player.getQueue(message.guild.id).dispatcher.streamTime);

      let embed = new Discord.MessageEmbed()
        .setTitle(
          "#" + message.member.voice.channel.name + " | " + message.author.tag
        )
        .addField(`Now Playing ${podelemoji}:`, `${track.name}`)
        .addField(`Duration`, `${track.duration}`)
        .addField(`Timestamp`, time)
        .addField(
          "Listen to this track here:",
          `[Open Youtube](${track.url})`,
          true
        )
        .setThumbnail(track.thumbnail)
        .setColor(colour)
        .setTimestamp()
        .setFooter(
          "Podel, coded by the government of georgia",
          bot.user.displayAvatarURL()
        );

      await message.channel.send(embed);
    }
  } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "nowplaying",
  aliases: ['np', 'nowp'],
  type: "user"
}