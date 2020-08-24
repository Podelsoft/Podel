const Discord = require('discord.js');
const db = require('quick.db');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {

  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission('KICK_MEMBERS')) {

    const channel = bot.guilds.get('696515024746709003').channels.get(`${message.channel.id}`);
            
    let p = args.join(" ");
 
    let reason = p.toString().split(args[0])[1].trim();

    let idmsg = "";
    let msgcont = "";
    let user = "";

    await channel.fetchMessage(args[0]).then(msg => idmsg = msg.id);

    await channel.fetchMessage(args[0]).then(msg => msgcont = msg.content);

    await channel.fetchMessage(args[0]).then(msg => user = msg.author);

//  let user = bot.users.find(user => user.username.toLowerCase().includes(args[0])) || message.mentions.users.first();
  
    if(!user) return message.channel.send("user/message not found.");

    if (user) {

    let embed = new Discord.RichEmbed()
      .setTitle(`${user.tag} | Message Warn`)
      .addField('Reason', reason)
      .addField('Mod/Admin', message.author.tag)
      .addField('Message', msgcont)
      .addField('Message ID', idmsg)
      .setThumbnail(user.displayAvatarURL)
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL)
 
    let warns = db.fetch(`warnCount_${user.id}`);    
   
      await (message.delete());
      
      await channel.fetchMessage(args[0]).then(msg => msg.delete(3000));    

      await db.add(`warnCount_${user.id}`, 1)
 
      await user.send(`you've been warned on Podel Server for **${reason}**`);      

      await bot.guilds.get("696515024746709003").channels.get("704356972606259220").send(embed);
      
    } 
  }
};

module.exports.help = {
  name: "msgwarn",
  aliases: ['mw', 'msgw', 'messagewarn']
}

