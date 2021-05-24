const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args, tools) => {

  if (!args[0]) { return message.channel.send("use p!leaderboard `balance` or p!leaderboard `xp` to get started mate."); }

  if (args[0] === "xp") {

    var place = 1;

    let embed = new Discord.MessageEmbed()
      .setAuthor("Podel XP Leaderboard", message.guild.iconURL())
      .setColor(colour)
      .setTimestamp()
      .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL())
      .setThumbnail("https://cdn.glitch.com/5d94d2b3-55ae-4001-86e0-104c8c5e4005%2Fswiss%20banking%20montage%20for%20bot.png?v=1588393805266");

    let xp = db.all().filter((data) => data.ID.endsWith("xp")).sort((a, b) => b.data - a.data);
    xp.length = 10;
    var i = 0;
    for (i in xp) {
      let usertag = await bot.users.fetch(xp[i].ID.split('_')[0]);
      if (usertag === undefined) usertag = `<cannot fetch this user | ${xp[i].ID.split('_')[0]}>`;
      else usertag = usertag.username + "#" + usertag.discriminator
      let level = db.fetch(`${xp[i].ID.split('_')[0]}_level`);
      embed.addField(
        `${`**${place}:** \`` + usertag}\``,
        `[Level: ${level}  | XP: ${xp[i].data}]${`(https://podel.cristpz.eu/leaderboard/xp#${place})`}`
      );
      place++;
    }

    message.channel.send(embed);

  } else if (args[0].toLowerCase() === "balance") {

    const embed = new Discord.MessageEmbed()
      .setAuthor(`Podel Balance Leaderboard`, message.guild.iconURL())
      .setColor(colour)
      .setTimestamp()
      .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL())
      .setThumbnail("https://scitechdaily.com/images/Economic-Crash.jpg");

    let money = db.all().filter((data) => data.ID.startsWith("balance")).sort((a, b) => b.data - a.data);
    money.length = 12;
    var i = 0;
    let indexnum = 1;
    for (i in money) {
      if (indexnum > 10) return;
      if (!config.noBLB.includes(money[i].ID.split('_')[1])) {
      let usertag = await bot.users.fetch(money[i].ID.split('_')[1]);
      if (usertag === undefined) usertag = `<cannot fetch this user | ${money[i].ID.split('_')[1]}>`;
      else usertag = usertag.username + "#" + usertag.discriminator
      embed.addField(
        `${`**${indexnum}:** \`` + usertag}\``,
        `[Balance: ${money[i].data}](https://podel.cristpz.eu/leaderboard/balance#${indexnum}) :pound:`
      );
      indexnum++;
     }
    }

    message.channel.send(embed);
  }
};

module.exports.help = {
  name: "leaderboard",
  aliases: ["top", "top10", "lb"],
  type: "user"
};
