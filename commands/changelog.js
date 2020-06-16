const Discord = require('discord.js');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  let podelemoji = bot.emojis.find(emoji => emoji.name === `podel`);
  
  const embed = new Discord.RichEmbed()
  .setTitle('v0.6.2 Changelog | 11/6/2020')
  .setDescription(`\`\`\`diff
+ [command] Updated p!ans <QUESTION> | <ANSWER>, multiple answers can be added now (WARNING: NOT SIMULTANEOUSLY)
+ [general] Added aliases to commands\`\`\``)
  .setColor(colour)
  .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL);
  
  message.channel.send(embed);
  
}

module.exports.help = {
  name: "changelog"
}