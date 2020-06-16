const Discord = require('discord.js');
const db = require('quick.db');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission('KICK_MEMBERS')) {
    
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    if(!user) return message.channel.send("user not found.");
    
    let warns = db.fetch(`warnCount_${user.user.id}`);
    
    if (warns === null) return message.channel.send('that user has no warns to clear.');
    
    let reason = args.join(" ").slice(22);
        
    if (user) {
      
      let embed = new Discord.RichEmbed()
      .setTitle(`${user.user.tag} | Cleared Warns`)
      .addField('Count', warns)
      .setThumbnail(user.user.displayAvatarURL)
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL)
      
      await (message.delete());
      
      await bot.guilds.get("696515024746709003").channels.get("704356972606259220").send(embed);
      
      await db.delete(`warnCount_${user.user.id}`);
      
    }
  }
};

module.exports.help = {
  name: "clearwarn",
  aliases: ['cw']
}