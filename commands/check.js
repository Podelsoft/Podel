const Discord = require('discord.js');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission('KICK_MEMBERS')) {
    
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    
    if(!user) return message.channel.send("user not found.");
    
    let warns = db.fetch(`warnCount_${user.user.id}`);
    
    let bans = db.fetch(`banCount_${user.user.id}`);
    
    let kicks = db.fetch(`kickCount_${user.user.id}`);
    
    let mutes = db.fetch(`muteCount_${user.user.id}`);
    
    if (warns === null) warns = 0;
    
    if (bans === null) bans = 0;
    
    if (kicks === null) kicks = 0;
    
    if (mutes === null) mutes = 0;
    
    let reason = args.join(" ").slice(22);
      
    if (user) {
      
      await (message.delete());
      
      await message.channel.send(`__**${user.user.tag}**__ | **Warns:** ${warns} | **Mutes:** ${mutes} | **Bans:** ${bans} | **Kicks:** ${kicks}`)
      
    }
  }
};

module.exports.help = {
  name: "check"
}