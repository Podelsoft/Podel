const Discord = require("discord.js");
const xp = require("../xp.json");
const config = require("../config.json"),
      colour = config.colour;

module.exports.run = async (bot, message, args, tools) => {

if (!args[0]) { return message.channel.send("use p!leaderboard `balance` or p!leaderboard `xp` to get started mate."); }
//if (args[0].toLowerCase() !== "balance") return message.channel.send("use p!leaderboard `balance` or p!leaderboard `xp` instead.");
//if (args[0].toLowerCase() !== "xp") return message.channel.send("use p!leaderboard `balance` or p!leaderboard `xp` instead.");

if (args[0] === "xp") {
  
let file = Object.entries(xp)
              .map(([key, val]) => ({id: key, ...val}))
              .sort((a, b) => b.xp - a.xp);

let n2 = args[1] * 10;
let n3 = n2 - 9;
let n1 = n2 - 10;

if (!args[1] || isNaN(args[1])) { 
  n1 = 0, 
  n2 = 10, 
  n3 = 1;
}

let result = file.slice(n1, n2);
let data = JSON.stringify(result);
  
data = data.replace(/[^0-9,]/g,'');
data = data.split(',');

var place = n3;

let embed = new Discord.MessageEmbed()
.setAuthor("Podel XP Leaderboard", message.guild.iconURL())
.setColor(colour)
.setTimestamp()
.setFooter("Podel, coded by the government of georgia", bot.user.avatarURL())
.setThumbnail("https://cdn.glitch.com/5d94d2b3-55ae-4001-86e0-104c8c5e4005%2Fswiss%20banking%20montage%20for%20bot.png?v=1588393805266");

for (var i = 0; i < 29; i = i + 3) {
  let usertag = bot.users.cache.get(data[i]);
  if (usertag === undefined) usertag = `<cannot fetch this user | ${data[i]}>`;
  else if (usertag !== undefined) usertag = bot.users.cache.get(data[i]).tag;
  embed.addField(
    "**" + place + ":** `" + usertag + "`",
    "Level: " + data[i + 2] + "  | XP: " + data[i + 1]
  );
  place++;
}

message.channel.send(embed);
  
} else if (args[0].toLowerCase() === "balance") {

  const db = require("quick.db");

  const embed = new Discord.MessageEmbed()
    .setAuthor(`Podel Balance Leaderboard`, message.guild.iconURL())
    .setColor(colour)
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL())
    .setThumbnail("https://scitechdaily.com/images/Economic-Crash.jpg");

  let money = db.all().filter((data) => data.ID.startsWith("balance")).sort((a, b) => b.data - a.data);
    money.length = 10;
    var i = 0;
    let indexnum = 0;
    for (i in money) {
      let usertag = bot.users.cache.get(money[i].ID.split('_')[1]);
      if (usertag === undefined) usertag = `<cannot fetch this user | ${money[i].ID.split('_')[1]}>`;
      else if (usertag !== undefined) usertag = bot.users.cache.get(money[i].ID.split('_')[1]).tag;
       embed.addField(
        `**${indexnum + 1}:** \`` + usertag + "`",
        `Balance: ${money[i].data} :pound:`
       );
       indexnum++;
    }

    message.channel.send(embed);
}
};

module.exports.help = {
  name: "leaderboard",
  aliases: ["top", "top10", "lb"],
  type: "user"
}