const Discord = require('discord.js');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
 
  let suggestion = args.slice(0).join(" ");
  if (!suggestion) return message.reply("please enter a valid suggestion!");
  let suggestembed = new Discord.MessageEmbed()
  .addField("Suggestion", suggestion)
  .setTimestamp()
  .setColor(colour)
  .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL());
  
  await bot.guilds.cache.get("644551231020204062").channels.cache.get("678383868268773379").send(suggestembed);

  await message.channel.send('suggestion saved.');
  
}

module.exports.help = {
  name: "suggest"
}