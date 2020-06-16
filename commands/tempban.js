const Discord = require("discord.js");
const config = require("../config.json"),
  colour = config.colour;
const db = require("quick.db");
const xp = require("../xp.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission("BAN_MEMBERS")) {
    let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (user) {
      const member = user;
      if (member) {
        let bantime = args[1];

        if (!bantime)
          return message.channel.send(
            "you didn't specify any indefinite continued progress of existence and events in the past, present, and future regarded as a whole."
          );

        if (bantime === NaN)
          return message.channel.send(
            "for how long?? (like p!tempban @user 1s idk)"
          );

        if (bantime < 0) return message.channel.send("how is this man.");

        let embed = new Discord.RichEmbed()
          .setTitle(`${user.user.tag} | Tempban`)
          .addField("Time", bantime, true)
          .addField("Mod/Admin", message.author.tag, true)
          .setThumbnail(user.user.displayAvatarURL)
          .setColor(colour)
          .setTimestamp()
          .setFooter(
            "Podel, coded by the government of georgia",
            bot.user.avatarURL
          );

        await message.delete();

        await bot.guilds
          .get("696515024746709003")
          .channels.get("704356972606259220")
          .send(embed);

        setTimeout(function() {
          let embed2 = new Discord.RichEmbed()
            .setTitle(`${user.user.tag} | Unban`)
            .addField("Time", bantime, true)
            .addField("Mod/Admin", message.author.tag, true)
            .setThumbnail(user.user.displayAvatarURL)
            .setColor("#9e0e24")
            .setTimestamp()
            .setFooter(
              "Podel, coded by the government of georgia",
              bot.user.avatarURL
            );
          message.guild.unban(user, {
            reason: "was tempbanned for " + bantime
          });
          bot.guilds
            .get("696515024746709003")
            .channels.get("704356972606259220")
            .send(embed2);
        }, ms(bantime));

        await user.user
          .send("you've been banned from Podel Server for **" + bantime + "**")
          .then(async () => {
            member
              .ban({
                reason: "eliminated by podelbot for " + bantime
              })
              .then(async () => {
                await message.reply(
                  `Successfully banned ${user.user.tag} for ${bantime}`
                );
                await db.add(`banCount_${user.user.id}`, 1);
              })
              .catch(err => {
                message.reply("I was unable to ban the member");
                console.error(err);
              });
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to ban!");
    }
  }
};

module.exports.help = {
  name: "tempban"
}