const Discord = require('discord.js');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  let podelemoji = bot.emojis.find(emoji => emoji.name === `podel`);
  
  const embed = new Discord.RichEmbed()
  .setTitle('v1.1.0 Changelog | 24/8/2020')
  .setDescription(`\`\`\`diff
+ All previous updates.
+ Added Search By ID for all Moderation commands.
+ Added 3 New Tiers (Tier 1: p!drive and x2 p!work money, Tier 2: all previous perks + x2 p!drive money, Tier 3: all previous perks + x4 p!drive money).
+ New cars: the 2009 Hyundai Sonata, the 2009 Hyundai Accent, the 2007 Kia Rondo EX Wagon, the 2008 Suzuki SX4 Wagon and the 2009 Mitsubishi Galant.
--- Fixed all missing car release dates at the p!shop.
+ New command: p!msgwarn <message id> <reason> (the 2 other commands p!additem and p!addcar are very experimental and might not work as intended)\`\`\``)
  .setColor(colour)
  .setFooter('Podel, are ya coding son?', bot.user.avatarURL);
  
  message.channel.send(embed);
  
}

module.exports.help = {
  name: "changelog"
}
