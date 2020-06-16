const Discord = require("discord.js");
const xp = require("../xp.json");
const db = require("quick.db");
const config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission("BAN_MEMBERS")) {
    const user = message.mentions.users.first();
    if (user) {
      const member = message.guild.member(user);
      if (member) {
        member
          .kick({
            reason: "eliminated by podelbot"
          })
          .then(async () => {
            let reason = args.join(" ").slice(22);
            let embed = new Discord.RichEmbed()
              .setTitle(`${user.tag} | Kick`)
              .addField("Reason", reason, true)
              .addField("Mod/Admin", message.author.tag, true)
              .setThumbnail(user.displayAvatarURL)
              .setColor(colour)
              .setTimestamp()
              .setFooter(
                "Podel, coded by the government of georgia",
                bot.user.avatarURL
              );
            await message.reply(`Successfully kicked ${user.tag}`);
            await db.add(`kickCount_${user.id}`, 1);
            await bot.guilds
              .get("696515024746709003")
              .channels.get("704356972606259220")
              .send(embed);
          })
          .catch(err => {
            message.reply("I was unable to kick the member");
            console.error(err);
          });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to kick!");
    }
  }
};

module.exports.help = {
  name: "kick"
}