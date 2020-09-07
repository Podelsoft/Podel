const Discord = require('discord.js');
let config = require('../config.json'),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  let podelemoji = bot.emojis.cache.find(emoji => emoji.name === `podel`);

  const embed = new Discord.MessageEmbed()
    .setTitle('v1.3.3 Changelog | 7/9/2020')
    .setDescription(`
  •	 Fixed commands: p!rolefind, p!unban, p!unmute and p!clear`)
    .setColor(colour)
    .setFooter('Podel, are ya coding son?', bot.user.avatarURL());

  message.channel.send(embed);

}

module.exports.help = {
  name: "changelog"
}
