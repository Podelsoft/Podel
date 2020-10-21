const Discord = require("discord.js");
const db = require("quick.db");
let config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  if (message.guild.id !== config.guildID) { return }

  if (message.member.hasPermission("KICK_MEMBERS")) {

    let user = message.guild.member(bot.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase()))) || message.mentions.members.first() || bot.users.cache.find(user => user.id === args[0]);

    if (!user) return message.channel.send("user not found.");

    if (user.tag === "Podel#8232") return;

    let warns = db.fetch(`warnCount_${user.user.id}`);

    if (warns === null) return message.channel.send("that user has no warns to clear.");

    let embed = new Discord.MessageEmbed()
      .setTitle(`${user.user.tag} | Cleared Warns`)
      .addField('Count', warns)
      .setThumbnail(user.user.displayAvatarURL())
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL())

    await (message.delete());

    await bot.guilds.cache.get(config.guildID).channels.cache.get(config.warningsID).send(embed);

    await db.delete(`warnCount_${user.user.id}`);

  }
};

module.exports.help = {
  name: "clearwarn",
  aliases: ["cw"],
  type: "mod"
}
