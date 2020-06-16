const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  if (message.author.id !== '306104099185623042') return;
  let j = args.join(" ");
  let name = j.substring(0, j.indexOf("|"));
  let scode = j.split("|")[1];
  const fs = require("fs");
  const path = `./commands/${name.trim().toLowerCase()}.js`;
  try {
    if (!fs.existsSync(path)) {
      fs.writeFile(
        `./commands/${name.trim().toLowerCase()}.js`,
        `
const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json'),
      colour = config.colour;
const fs = require('fs');
const superagent = require('superagent');
const yts = require('yt-search');
const ms = require('ms');
const snekfetch = require('snekfetch');

module.exports.run = async(bot, message, args) => {
${scode}
}

module.exports.name = {
  name: "${name.trim()}"
}
`,
        function(err) {
          if (err) throw err;
          console.log(`added command ${name.trim()}.js | Code: ${scode.trim()} `);
          message.channel.send(`added command **${name.trim()}.js** | **Code:** \n\`\`\`${scode.trim()}\`\`\``);
        }
      );
    } else return;
  } catch (err) {
    message.channel.send("`ERROR:` " + "```" + err + "```");
    console.error(err);
  }
};

module.exports.help = {
  name: "makecommand",
  aliases: ['mc', 'makecmd']
}