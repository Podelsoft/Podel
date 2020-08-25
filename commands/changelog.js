const Discord = require('discord.js');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  let podelemoji = bot.emojis.find(emoji => emoji.name === `podel`);
  
  const embed = new Discord.RichEmbed()
  .setTitle('v1.2.0 Changelog | 25/8/2020')
  .setDescription(`\`\`\`diff
+ All previous updates.
+ New cars: the 2007 Nissan Murano, the 2007 BMW 3 Series, the 2007 Volkswagen Passat Wagon, the 2007 Volkswagen Passat Sedan and the 2009 Mazda Tribute.
--- Fixed p!work universal car x2 multiplier.
+ New command: p!msgmute <message id> <time> <reason>.\`\`\``)
  .setColor(colour)
  .setFooter('Podel, are ya coding son?', bot.user.avatarURL);
  
  message.channel.send(embed);
  
}

module.exports.help = {
  name: "changelog"
}
