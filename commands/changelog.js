const Discord = require("discord.js");
let config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.MessageEmbed()
    .setTitle("v1.5.0 Changelog | 19/10/2020")
    .setDescription(`
  •	 Fixed/Updated commands: p!play, p!add, p!info, p!nowplaying, p!stats, p!rank.
  •  Fixed formatting for all files.
  •  New Car: the 1985 Lancia Delta S4 "Stradale".
  •  Added **marked out** code for command cooldowns.`)
    .setColor(colour)
    .setFooter("Podel, are ya coding son?", bot.user.avatarURL());

  message.channel.send(embed);

}

module.exports.help = {
  name: "changelog",
  type: "user"
}
