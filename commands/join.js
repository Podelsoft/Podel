const db = require("quick.db");

module.exports.run = async (bot, message, args) => {

  if (message.channel.id !== "708435487525961840")
  var role = message.guild.roles.cache.find(role => role.name === "New Member");

  let muted = db.fetch(`muted_${message.author.id}`);
  var mutedrole = message.guild.roles.cache.find(role => role.name === "Muted");

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
  name: "join"
}