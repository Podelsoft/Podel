const Discord = require('discord.js');
const config = require('../config.json'),
      colour = config.colour;

module.exports.run = async(bot, message, args) => {
    if (isNaN(args[0]) || args[0] < 0) return message.channel.send("you need to input a valid number.");
    let level = args[0] - 1; 
    let result = 5 * (level ** 2) + 50 * level + 100;
    let embed = new Discord.MessageEmbed()
    .setTitle(`Level ${args[0]}`)
    .addField(`XP to LVL`, result)
    .setColor(colour)
    .setFooter('Podel, executera ONLINEKALKYLATORN', bot.user.avatarURL());
    message.channel.send(embed);
}

module.exports.help = {
    name: "calc",
    type: "user"
}