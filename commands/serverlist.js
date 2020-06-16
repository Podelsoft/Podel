const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (bot, message, args) => {
  if (message.author.id !== '306104099185623042') return;   
  let list = bot.guilds.map(g=>g.name).join('\n');
  for(let i = 0; i < list.length; i += 2000) {
    const toSend = list.substring(i, Math.min(list.length, i + 2000));
    message.channel.send(toSend);
}
}

module.exports.help = {
  name: "serverlist"
}