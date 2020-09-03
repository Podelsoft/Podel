const Discord = require('discord.js');
let config = require('../config.json'),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  let podelemoji = bot.emojis.cache.find(emoji => emoji.name === `podel`);

  const embed = new Discord.MessageEmbed()
    .setTitle('v1.3.1 Changelog | 3/9/2020')
    .setDescription(`
  •	 Made a Deprecated folder for all deprecated code.
  •	 Removed p!ans and the @podel answering thing (DEPRECATED).
  •	 Removed more useless marked out code on podel.js.`)
    .setColor(colour)
    .setFooter('Podel, are ya coding son?', bot.user.avatarURL());

  message.channel.send(embed);

}

module.exports.help = {
  name: "changelog"
}
