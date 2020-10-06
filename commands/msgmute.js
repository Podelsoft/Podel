const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
let config = require("../config.json"),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== config.guildID) return;
  
  if (message.member.hasPermission("MANAGE_MESSAGES")) {

   const channel = bot.guilds.cache.get(config.guildID).channels.cache.get(`${message.channel.id}`);
   const channel2 = bot.guilds.cache.get(config.guildID).channels.cache.get("734494129051926619");   

    let p = args.join(" ");
 
    let reason = p.toString().split(args[1])[1].trim();

    let idmsg = "";
    let msgcont = "";
    let user2 = "";

    await channel.messages.fetch(args[0]).then(msg => idmsg = msg.id);

    if (message.attachments.size < 0) {
      await channel.messages.fetch(args[0]).then(msg => msgcont = msg.content);
    } else { msgcont = "attachment saved in logs" }

    await channel.messages.fetch(args[0]).then(msg => user2 = msg.author);
    
    let user = message.guild.member(user2);
    
    if (!user) return message.channel.send("user not found.");
      
      let mutetime = args[1];
      
      if (!reason) return message.channel.send("you didn\"t provide a valid reason");
  
      if (!mutetime) return message.channel.send("you didn\"t specify any indefinite continued progress of existence and events in the past, present, and future regarded as a whole.");
      
      if (isNaN(ms(mutetime))) return message.channel.send("for how long?? (like p!mute @user 1s idk)");
      
      if (mutetime < 0) return message.channel.send("how is this man.")
      
      var role = message.guild.cache.roles.find(role => role.name === "Muted");
      
      if (user.roles.cache.some(role => role.name === "Muted")) return message.channel.send(`that user is already muted.`)
      
      let embed = new Discord.MessageEmbed()
      .setTitle(`${user.user.tag} | Message Mute`)
      .addField("Time", mutetime)
      .addField("Reason", reason)
      .addField("Mod/Admin", message.author.tag)
      .addField("Message", msgcont)
      .addField("Message ID", idmsg)
      .setThumbnail(user.user.displayAvatarURL())
      .setColor(colour)
      .setTimestamp()
      .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL())
      
      await (message.delete());
      
      await channel.fetchMessage(args[0]).then(msg => msg.delete());

      await user.roles.add(role);
      
      await db.add(`muteCount_${user.user.id}`, 1)
      
      await db.push(`muted_${user.user.id}`, "yes");
      
      await user.user.send("you\"ve been muted on Podel Server for **" + mutetime + "** (Reason: " + reason + ") \n\n`message attached to mute:` ```" + msgcont + "```")
      .catch(() => channel2.send(user.user + ", you\"ve been muted on Podel Server for **" + mutetime + "** (Reason: " + reason + ") \n\n`message attached to mute:` ```" + msgcont + "```").then(msg => msg.delete(20000)));
      
      await bot.guilds.cache.get(config.guildID).channels.cache.get("704356972606259220").send(embed);
      
      setTimeout(function() {
      if (!user.roles.cache.some(role => role.name === "Muted")) return;
      let embed2 = new Discord.RichEmbed()
      .setTitle(`${user.user.tag} | Unmute`)
      .addField("Time", mutetime)
      .addField("Reason", reason)
      .addField("Mod/Admin", message.author.tag)
      .addField("Message", msgcont)
      .addField("Message ID", idmsg)
      .setThumbnail(user.user.displayAvatarURL())
      .setColor("#9e0e24")
      .setTimestamp()
      .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL())
      user.roles.remove(role);
      db.delete(`muted_${user.user.id}`);
      bot.guilds.cache.get(config.guildID).channels.cache.get("704356972606259220").send(embed2);
      }, ms(mutetime));
    }
  };

module.exports.help = {
  name: "msgmute",
  aliases: ["mm", "mutemsg"],
  type: "mod"
}
