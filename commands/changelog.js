const Discord = require('discord.js');
let config = require('../config.json'),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  let podelemoji = bot.emojis.cache.find(emoji => emoji.name === `podel`);

  const embed = new Discord.MessageEmbed()
    .setTitle('v1.3.2 Changelog | 5/9/2020')
    .setDescription(`
  •	 Fixed commands: p!bazinga, p!boiler, p!brick, p!car, p!global, p!kojima, p!simp, p!yep`)
    .setColor(colour)
    .setFooter('Podel, are ya coding son?', bot.user.avatarURL());

  message.channel.send(embed);

}

module.exports.help = {
  name: "changelog"
}
