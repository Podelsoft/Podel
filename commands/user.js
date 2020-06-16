const Discord = require("discord.js");
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  const moment = require("moment");
  require("moment-duration-format");
  const status = {
    online: "Online 🟢",
    idle: "Idle 🟠",
    dnd: "Do Not Disturb 🔴",
    offline: "Offline/Invisible ⚪"
  };
  const j = {
    false: "❌",
    true: "✅"
  }
  let user = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!user) {
    let embed = new Discord.RichEmbed()
    .setTitle(message.author.tag + " User Info")
    .addField("Bot", `${j[message.author.bot]}`, true)
    .addField("Status", `${status[message.author.presence.status]}`, true)
    .addField("ID", message.author.id)
    .addField(
      "Discord Join Date",
      `${moment
        .utc(message.author.createdAt)
        .format("dddd, MMMM Do YYYY, HH:mm:ss")}`,
      true
    )
    .addField("Server Join Date", message.member.joinedAt)
    .setThumbnail(message.author.displayAvatarURL)
    .setColor(colour)
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL);
    
    message.channel.send(embed);
    
  }
  
  if (user) {
  let embed = new Discord.RichEmbed()
    .setTitle(user.user.tag + " User Info")
    .addField("Bot", `${j[user.user.bot]}`, true)
    .addField("Status", `${status[user.presence.status]}`, true)
    .addField("ID", user.user.id)
    .addField(
      "Discord Join Date",
      `${moment
        .utc(user.user.createdAt)
        .format("dddd, MMMM Do YYYY, HH:mm:ss")}`,
      true
    )
    .addField("Server Join Date", user.joinedAt)
    .setThumbnail(user.user.displayAvatarURL)
    .setColor(colour)
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL);
    
    message.channel.send(embed);
    
  }
};

module.exports.help = {
  name: "user",
  aliases: ['u']
}