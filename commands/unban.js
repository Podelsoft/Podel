const Discord = require("discord.js");
const config = require("../config.json"),
  colour = config.colour;
const db = require("quick.db");
const xp = require("../xp.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission("BAN_MEMBERS")) {
    const banList = await message.guild.fetchBans();
    const bannedMember = banList.find(user => user.id === args[0]);

    try {
      bannedMember = await bot.users.fetch(args[0]);
    } catch (e) {
      if (!bannedMember) return message.channel.send("that's not a valid ID");
    }

    try {
      await message.guild.fetchBan(args[0]);
    } catch (e) {
      message.channel.send("that user is not banned.");
      return;
    }

    if (!message.guild.me.hasPermission(["BAN_MEMBERS"]))
      return message.channel.send("I can't do that");
    message.delete();
    try {
      let embed2 = new Discord.MessageEmbed()
        .setTitle(`${bannedMember.tag} | Unban`)
        .addField("Mod/Admin", message.author.tag, true)
        .setThumbnail(bannedMember.displayAvatarURL())
        .setColor("#9e0e24")
        .setTimestamp()
        .setFooter(
          "Podel, coded by the government of georgia",
          bot.user.avatarURL()
        );
      message.guild.unban(bannedMember, {
        reason: "unbanned by " + message.author.tag
      });
      message.channel
        .send(`Successfully unbanned ${bannedMember.tag}`)
        bot
        .guilds.get("696515024746709003")
        .channels.get("704356972606259220")
        .send(embed2);
    } catch (e) {
      console.log(e.message);
    }
  }
};

module.exports.help = {
  name: "unban"
}