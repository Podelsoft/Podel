const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

  if (!message.guild.id === config.guildID) return;
  if (message.member.hasPermission("BAN_MEMBERS")) {
    if (!message.guild.me.hasPermission(["BAN_MEMBERS"])) return message.channel.send("I can't do that");
    try {
      message.guild.members.unban(args[0]);
      message.channel
        .send(`done.`)
    } catch (e) {
      message.channel.send("that's not a valid ID");
    }
  }
};

module.exports.help = {
  name: "unban",
  type: "mod"
}