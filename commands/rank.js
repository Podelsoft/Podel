const Discord = require("discord.js");
let config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  let user = bot.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) || message.mentions.users.first();

  if (!user) user = message.author;
  if (user.id === bot.user.id) user = message.author;

  let podelemoji = bot.emojis.cache.find(emoji => emoji.name === `podel`);

  var xp = require("../xp.json");

  if (!xp[user.id]) {
    xp[user.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[user.id].xp;
  let curlvl = xp[user.id].level;
  let nxtlvl = 5 * (xp[user.id].level ** 2) + 50 * xp[user.id].level + 100;

  const progress = (curxp % 1000) / 1000;
  const progressOutOf10 = Math.round(progress * 10);

  const barStr = `${'🟢'.repeat(progressOutOf10)}${'🔴'.repeat(10 - progressOutOf10)}`;

  let file = Object.entries(xp)
    .map(([key, val]) => ({ id: key, ...val }))
    .sort((a, b) => b.xp - a.xp);
  n1 = 0,
    n2 = 200000,
    n3 = 1;
  let result = file.slice(n1, n2);
  let data = JSON.stringify(result);

  data = data.replace(/[^0-9,]/g, '');
  data = data.split(',');

  let place = n3;
  let placeNumber;

  function ending(i) {
    var j = i % 10,
      k = i % 100;
    if (j == 1 && k != 11) {
      return i + "st";
    }
    if (j == 2 && k != 12) {
      return i + "nd";
    }
    if (j == 3 && k != 13) {
      return i + "rd";
    }
    return i + "th";
  }

  for (var i = 0; i < data.length; i = i + 3) {
    if (!bot.users.cache.get(data[i])) { placeNumber = "Too Far"; break; }
    if (bot.users.cache.get(data[i]).id === user.id) { placeNumber = ending(place); break; } else {
      // TODO: get a job  
    };
    place++;
  }

  const embed = new Discord.MessageEmbed()
    .setTitle(user.tag + " | Stats")
    .addField("Messages", `${curxp}`)
    .addField("Podel LVL", `${curlvl}${podelemoji}`)
    .addField("Messages Remaining", `${curxp}/${nxtlvl}`)
    .addField("Place", `**${placeNumber}**`)
    .addField("Progress", `${barStr}`)
    .setColor(colour)
    .setThumbnail(user.displayAvatarURL())
    .setFooter(
      "Podel, the kid who types !rank every 15 mins",
      bot.user.avatarURL()
    );

  await message.channel.send(embed);

}

module.exports.help = {
  name: "rank",
  aliases: ["xp"],
  type: "user"
}
