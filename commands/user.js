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
  let user = bot.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) || message.mentions.users.first();
  if (user.id === bot.user.id) user = message.author;
  if (!user) {
    let embed = new Discord.MessageEmbed()
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
      .addField("Server Join Date",
        `${moment
          .utc(message.member.joinedAt)
          .format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
      .setThumbnail(message.author.displayAvatarURL()())
      .setColor(colour)
      .setTimestamp()
      .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL()());

    message.channel.send(embed);

  }

  if (user) {
    let embed = new Discord.MessageEmbed()
      .setTitle(user.tag + " User Info")
      .addField("Bot", `${j[user.bot]}`, true)
      .addField("Status", `${status[user.presence.status]}`, true)
      .addField("ID", user.id)
      .addField(
        "Discord Join Date",
        `${moment
          .utc(user.createdAt)
          .format("dddd, MMMM Do YYYY, HH:mm:ss")}`,
        true
      )
      .addField("Server Join Date",
        `${moment
          .utc(message.guild.member(user).joinedAt)
          .format("dddd, MMMM Do YYYY, HH:mm:ss")}`)
      .setThumbnail(user.displayAvatarURL())
      .setColor(colour)
      .setTimestamp()
      .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL());

    message.channel.send(embed);

  }
};

module.exports.help = {
  name: "user",
  aliases: ['u'],
  type: "user"
}
