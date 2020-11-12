const Discord = require("discord.js");
const db = require("quick.db");
let config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {
  let user = bot.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) || message.mentions.users.first();

  if (!user) user = message.author;
  if (user.id === bot.user.id) user = message.author;

  let bal = db.fetch(`balance_${user.id}`);

  if (bal === null) bal = 0;

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

  let money = db.all().filter((data) => data.ID.startsWith("balance")).sort((a, b) => b.data - a.data);
  money.length = 10000;
  var i = 0;
  let indexnum = 0;
  for (i in money) {
    let usertag = bot.users.cache.get(money[i].ID.split('_')[1]);
    if (usertag === undefined) usertag = `<cannot fetch this user | ${money[i].ID.split('_')[1]}>`;
    else if (usertag !== undefined) usertag = bot.users.cache.get(money[i].ID.split('_')[1]).tag;
    if (!usertag) { placeNumber = "Too Far"; break; }
    if (user.tag === usertag) {
      placeNumber = `${ending(indexnum + 1)}`;
      break;
    }
    indexnum++;
  }

  const embed = new Discord.MessageEmbed()
    .setTitle(user.tag + " | Stats")
    .addField("💷 Balance", `£${bal}`)
    .addField("📋 Place", `${placeNumber}`)
    .setColor(colour)
    .setThumbnail(user.avatarURL())
    .setFooter("Podel, use p!inventory to check your or someone's inventory", bot.user.avatarURL());

  await message.channel.send(embed);
};

module.exports.help = {
  name: "stats",
  aliases: ['bal', 'balance', 'profile', 'money', 'wallet'],
  type: "user"
}
