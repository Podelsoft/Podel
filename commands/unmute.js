const Discord = require('discord.js');
const db = require('quick.db');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission('MANAGE_MESSAGES')) {
    
    let user = message.guild.member(bot.users.cache.find(user => user.username.toLowerCase().includes(args[0]))) || message.mentions.members.first() || bot.users.cache.find(user => user.id === args[0]);    
    
    if (!user) return message.channel.send("user not found.");
              
      var role = message.guild.roles.cache.find(role => role.name === "Muted");
      
      if (!user.roles.cache.some(role => role.name === "Muted")) return message.channel.send(`that user is already unmuted.`)
      
      let embed = new Discord.MessageEmbed()
      .setTitle(`${user.user.tag} | Unmute`)
      .addField('Mod/Admin', message.author.tag, true)
      .setThumbnail(user.user.displayAvatarURL())
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL())
      
      await (message.delete());
      
      await bot.guilds.cache.get("696515024746709003").channels.cache.get("704356972606259220").send(embed);

      await user.roles.remove(role);
      
      await db.delete(`muted_${user.user.id}`);

    }
  };

module.exports.help = {
  name: "unmute",
  aliases: ['um', 'unsilence']
}
