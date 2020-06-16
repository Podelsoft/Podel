const Discord = require("discord.js");
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {

  let botsonly = message.guild.members.filter(member => member.user.bot).size;
  let usersonly = message.guild.memberCount - botsonly;
 
    let sicon = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}?size=128`;
  if (message.guild.features.includes('ANIMATED_ICON')) sicon = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.gif?size=128`
    let serverembed = new Discord.RichEmbed()
    .setTitle(`${message.author.tag} | Server Info`)
    .setColor(colour)
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name, true)
    .addField("Server ID", message.guild.id, true)
    .addField("Created On", message.guild.createdAt)
    .addField("Join Date", message.member.joinedAt)
    .addField("Users", usersonly, true)
    .addField("Bots", botsonly, true)
    .addField("Server Owner", message.guild.owner, true)
    .addField("Server Owner ID", message.guild.owner.id, true)
    .addField("Server Region", message.guild.region, true)
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.displayAvatarURL);

    message.channel.send(serverembed);
}

module.exports.help = {
  name: "server",
  aliases: ['s', 'sinfo']
}