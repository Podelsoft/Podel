const Discord = require('discord.js');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  let podelemoji = bot.emojis.find(emoji => emoji.name === `podel`);
  
  const embed = new Discord.RichEmbed()
  .setTitle('v0.8.1 Changelog | 22/7/2020')
  .setDescription(`\`\`\`diff
--- [update] Updated p!buy
--- [update] Updated p!sell
--- [update] Added command search\`\`\``)
  .setColor(colour)
  .setFooter('Podel, are ya coding son?', bot.user.avatarURL);
  
  message.channel.send(embed);
  
}

module.exports.help = {
  name: "changelog"
}
