const db = require("quick.db");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

  if (message.channel.id !== config.joinChannel) { return };
  var role = message.guild.roles.cache.find(role => role.id === config.joinRole);

  let muted = db.fetch(`muted_${message.author.id}`);
  var mutedrole = message.guild.roles.cache.find(role => role.id === config.mutedRole);

  if (muted !== null) {
    await message.delete();
    await message.member.roles.add(mutedrole);
    await message.member.roles.remove(role);
  } else {
    await message.delete();
    await message.member.roles.remove(role);
  }
};

module.exports.help = {
  name: "join",
  type: "user"
}