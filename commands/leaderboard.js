const Discord = require("discord.js");
const xp = require("../xp.json");
const alasql = require("alasql")
const config = require("../config.json"),
      colour = config.colour;

module.exports.run = async (bot, message, args, tools) => {
  
let file = Object.entries(xp)
              .map(([key, val]) => ({id: key, ...val}))
              .sort((a, b) => b.xp - a.xp);

  
let result = file.slice(0, 10);
let data = JSON.stringify(result);
var output = "";
  
data = data.replace(/[^0-9,]/g,'');
data = data.split(',');

var place = 1;

//output = output + "\n" + place + "  USER: " + bot.users.get(data[i]).tag + "  Level: " + data[i+2] + "  XP: " + data[i+1];

let embed = new Discord.RichEmbed()
.setTitle('Podel Leaderboard')
.setColor(colour)
.setTimestamp()
.setFooter('Podel, coded by the government of georgia', bot.user.avatarURL)
.setThumbnail('https://cdn.glitch.com/5d94d2b3-55ae-4001-86e0-104c8c5e4005%2Fswiss%20banking%20montage%20for%20bot.png?v=1588393805266');

for (var i = 0; i < 29; i = i + 3) {
  let usertag = bot.users.get(data[i]);
  if (usertag === undefined) usertag = "<cannot fetch this user>";
  else if (usertag !== undefined) usertag = bot.users.get(data[i]).tag;
  embed.addField(
    "**" + place + ":** `" + usertag + "`",
    "Level: " + data[i + 2] + "  | XP: " + data[i + 1]
  );
  place++;
}

//message.channel.send("```"+ output +"```");

message.channel.send(embed);
  
};

module.exports.help = {
  name: "leaderboard",
  aliases: ['top', 'top10', 'lb']
}