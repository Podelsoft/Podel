const Discord = require("discord.js");
const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  /*if (message.member.hasPermission("MANAGE_MESSAGES")) {
    let user = message.guild.member(
      message.mentions.users.first() || message.guild.members.get(args[0])
    );
    if (args[0] === `1`) {
      await message.delete();
      await db.add(`blacklisted_${user.user.id}`, 1);
    }
    if (args[0] === `0`) {
      await message.delete();
      await db.delete(`blacklisted_${user.user.id}`);
    }
  } */
};

module.exports.help = {
  name: "blacklist"
}