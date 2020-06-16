const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  let { body } = await superagent.get("https://api.cristpz.eu/v1/podel");

  message.channel.send(body.msg);
};

module.exports.help = {
  name: "podel"
}