const Discord = require("discord.js");
const config = require('../config.json'),
      colour = config.colour;

module.exports.run = async (bot, message, args) => {
  if (message.member.voice.channel) {
  let queue = await bot.player.getQueue(message.guild.id);
    if (!queue) return message.channel.send('nothing playing right now.')
    let ipod = queue.songs.map((song, i) => {
            return `${i === 0 ? '`Current`' : `\`${i}.\``} - **${song.name}**`
        }).join('\n')
    let sicon = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}?size=128`;
    if (message.guild.features.includes("ANIMATED_ICON"))
      sicon = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.gif?size=128`;

    let embed = new Discord.MessageEmbed()
      .setTitle(`${message.guild.name} | Server Queue`)
      .setColor(colour)
      .setDescription(ipod)
      .setTimestamp()
      .setFooter(
        "Podel, coded by the government of georgia",
        bot.user.avatarURL()
      )
      .setThumbnail(
        sicon
      );
    
        message.channel.send(embed);
    
  } else {
    message.reply("you need to be in the voice channel first.");
  }
};

module.exports.help = {
  name: "queue",
  aliases: ["q"],
  type: "user"
}