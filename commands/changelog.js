const Discord = require('discord.js');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  let podelemoji = bot.emojis.find(emoji => emoji.name === `podel`);
  
  const embed = new Discord.RichEmbed()
  .setTitle('v0.9 Changelog | 12/8/2020')
  .setDescription(`\`\`\`diff
--- [update] Updated p!buy (2)
--- [update] Updated p!sell (2)
--- [update] Updated p!shop and the entire item system (moved to json)
--- [shop] Added the Overlord Pass (p!buy/sell overlordpass 1 or more)\`\`\``)
  .setColor(colour)
  .setFooter('Podel, are ya coding son?', bot.user.avatarURL);
  
  message.channel.send(embed);
  
}

module.exports.help = {
  name: "changelog"
}
