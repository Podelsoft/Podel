const Discord = require('discord.js');
const db = require('quick.db');
const ms = require('ms');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  let j = args.join(' ');
  let reason = j.split(args[1])[1];
  
  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission('MANAGE_MESSAGES')) {
    
    let user = message.guild.member(bot.users.find(user => user.username.toLowerCase().includes(args[0]))) || message.mentions.members.first();
    
    if(!user) return message.channel.send("user not found.");
        
    if (user) {
      
      let mutetime = args[1];
      
      if (!reason) return message.channel.send('you didn\'t provide a valid reason');
  
      if (!mutetime) return message.channel.send('you didn\'t specify any indefinite continued progress of existence and events in the past, present, and future regarded as a whole.');
      
      if (mutetime === NaN) return message.channel.send('for how long?? (like p!mute @user 1s idk)');
      
      if (mutetime < 0) return message.channel.send('how is this man.')
      
      var role = message.guild.roles.find(role => role.name === "Muted");
      
      if (user.roles.some(role => role.name === "Muted")) return message.channel.send(`that user is already muted.`)
      
      let embed = new Discord.RichEmbed()
      .setTitle(`${user.user.tag} | Mute`)
      .addField('Time', mutetime)
      .addField('Reason', reason)
      .addField('Mod/Admin', message.author.tag)
      .setThumbnail(user.user.displayAvatarURL)
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL)
      
      await (message.delete());
      
      await user.addRole(role);
      
      await db.add(`muteCount_${user.user.id}`, 1)
      
      await db.push(`muted_${user.user.id}`, 'yes');
      
      await user.user.send('you\'ve been muted on Podel Server for **' + mutetime + '** (Reason:' + reason + ')');
      
      await bot.guilds.get("696515024746709003").channels.get("704356972606259220").send(embed);
      
      setTimeout(function() {
      if (!user.roles.some(role => role.name === "Muted")) return;
      let embed2 = new Discord.RichEmbed()
      .setTitle(`${user.user.tag} | Unmute`)
      .addField('Time', mutetime)
      .addField('Reason', reason)
      .addField('Mod/Admin', message.author.tag)
      .setThumbnail(user.user.displayAvatarURL)
      .setColor('#9e0e24')
      .setTimestamp()
      .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL)
      user.removeRole(role);
      db.delete(`muted_${user.user.id}`);
      bot.guilds.get("696515024746709003").channels.get("704356972606259220").send(embed2);
      }, ms(mutetime));
      
    }
  }
};

module.exports.help = {
  name: "mute",
  aliases: ['m', 'silence']
}
