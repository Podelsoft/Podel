const Discord = require("discord.js");
const db = require("quick.db");
const ms = require("ms");
let config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {
  var role = message.guild.roles.find(role => role.name === "New Member");
  var channel = message.guild.channels.find(
    channel => channel.name === "welcome-lobby"
  );

  let muted = db.fetch(`muted_${message.author.id}`);
  var mutedrole = message.guild.roles.find(role => role.name === "Muted");

  if (muted !== null) {
    await message.delete();
    await message.member.addRole(mutedrole);
    await message.member.removeRole(role);
  } else {
    await message.delete();
    await message.member.removeRole(role);
  }
};

module.exports.help = {
  name: "join"
}