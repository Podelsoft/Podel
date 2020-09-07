const Discord = require("discord.js");
const config = require("../config.json"),
  colour = config.colour;
const db = require("quick.db");
const xp = require("../xp.json");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  
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
  name: "unban"
}