const Discord = require('discord.js');

module.exports.run = async(bot, message, args) => {
if (message.member.hasPermission("KICK_MEMBERS")) {
  const role = message.guild.roles.find("name", args.join(' '));
  message.channel.send('ID: ' + role.id + '');
 }
}

module.exports.help = {
  name: "roleid",
  aliases: ["rid", "idrole"]
}
