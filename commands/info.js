const Discord = require('discord.js');
const pack = require('../package.json');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  const ram = process.memoryUsage().heapUsed / 1024 / 1024;
  const ram2 = 512 - process.memoryUsage().heapUsed / 1024 / 1024;
  const used = ram.toString().slice(0, 5);
  const available = ram2.toString().slice(0, 5);
  
  const embed = new Discord.RichEmbed()
  .setTitle(message.author.tag + ' | Bot Info')
  .addField('Bot Version', `v${pack.version}`)
  .addField('RAM Used', `${used}MB`)
  .addField('Available RAM', `${available}MB`)
  .addField('Total RAM', `512MB`)
  .setColor(colour)
  .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL);
  
  message.channel.send(embed);
  
}

module.exports.help = {
  name: "info",
  aliases: ['botinfo', 'bot']
}