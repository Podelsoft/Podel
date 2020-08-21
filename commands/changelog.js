const Discord = require('discord.js');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  let podelemoji = bot.emojis.find(emoji => emoji.name === `podel`);
  
  const embed = new Discord.RichEmbed()
  .setTitle('v1.0 Changelog | 20/8/2020')
  .setDescription(`\`\`\`diff
+ [update] Updated p!buy (3)
+ [update] Updated p!sell (3)
+ [update] Updated p!shop (2)
+ [update] Updated p!stats (almost entirely)
+ [update] Updated p!work (to work with all cars)
+ [command] Added p!setcar (p!setcar <car name>)
+ [shop] Added the following cars: Chevrolet Cobalt SS & Mazda MX-5 Miata\`\`\``)
  .setColor(colour)
  .setFooter('Podel, are ya coding son?', bot.user.avatarURL);
  
  message.channel.send(embed);
  
}

module.exports.help = {
  name: "changelog"
}
