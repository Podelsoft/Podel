const Discord = require('discord.js');
const superagent = require('superagent');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  let {body} = await superagent
  .get('https://api.cristpz.eu/v1/conspiracy');
  
  const embed = new Discord.MessageEmbed()
  .setTitle('Conspiracy Theory')
  .setDescription(body.msg)
  .setColor(colour)
  .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL());
  
  message.channel.send(embed);
  
}

module.exports.help = { 
  name: "conspiracy"
}