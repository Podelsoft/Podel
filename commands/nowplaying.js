const Discord = require("discord.js");
let config = require('../config.json'),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  let podelemoji = bot.emojis.cache.find(emoji => emoji.name === `podel`);

  if (message.member.voice.channel) {

    let isPlaying = bot.player.isPlaying(message.guild.id);

    if (!isPlaying) {
      await message.channel.send('nothing is playing, smell off.');
    } else {

      let track = await bot.player.nowPlaying(message.guild.id);

      let prog = bot.player.createProgressBar(message.guild.id, 8);

      let embed = new Discord.MessageEmbed()
        .setTitle(
          "#" + message.member.voice.channel.name + " | " + message.author.tag
        )
        .addField(`Now Playing ${podelemoji}:`, `${track.name}`)
        .addField(`Progress`, prog)
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