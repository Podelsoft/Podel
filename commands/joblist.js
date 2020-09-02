const Discord = require('discord.js');
const config = require('../config.json'),
      colour = config.colour;

module.exports.run = async(bot, message, args) => {
  let embed = new Discord.MessageEmbed()
  .setTitle('Podel Joblist')
  .setDescription('This is the list of jobs available which can be randomly obtained using p!work')
  .setColor(colour)
  .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL())
  .addField('Somerfield Cashier', '£5/hour') // per day: £120 (5*24)
  .addField('Tesco Guard', '£10/2 hours') // per day: £120 (5*24/2)
  .addField('Aldi Manager', '£60/12 hours') // per day: £120 (60*2)
  .addField('Chairman', '£120/day') // per day: £120 (120*1)
  
  message.channel.send(embed);
}

module.exports.help = {
  name: "joblist",
  aliases: ['jobs', 'jobinfo']
}