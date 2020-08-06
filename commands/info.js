const Discord = require('discord.js');
const pack = require('../package.json');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  const ram = process.memoryUsage().heapUsed / 1024 / 1024;
  const ram2 = 850 - process.memoryUsage().heapUsed / 1024 / 1024;
  const used = ram.toString().slice(0, 5);
  const available = ram2.toString().slice(0, 5);
  
  function format(seconds){
   function pad(s){
     return (s < 10 ? '0' : '') + s;
   }
   var hours = Math.floor(seconds / (60*60));
   var minutes = Math.floor(seconds % (60*60) / 60);
   var seconds = Math.floor(seconds % 60);

   return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

  var uptime = process.uptime();

  const embed = new Discord.RichEmbed()
  .setTitle(message.author.tag + ' | Bot Info')
  .addField('Bot Version', `v${pack.version}`)
  .addField('RAM Used', `${used}MB`)
  .addField('Available RAM', `${available}MB`)
  .addField('Total RAM', `850MB`)
  .addField('Uptime', format(uptime))
  .setColor(colour)
  .setFooter('Podel, spaghetti code everywhere', bot.user.avatarURL);
  
  message.channel.send(embed);
  
}

module.exports.help = {
  name: "info",
  aliases: ['botinfo', 'bot']
}
