const Discord = require("discord.js");
const db = require("quick.db");
let config = require("../config.json"),
  colour = config.colour;
const json = require("../items.json");

module.exports.run = async (bot, message, args) => {
  let user = bot.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) || message.mentions.users.first();

  if (!user) user = message.author;
  if (user.id === bot.user.id) user = message.author;

/*
  const astraemoji = bot.emojis.find(emoji => emoji.name === `astra`);
  const mx5emoji = bot.emojis.find(emoji => emoji.name === `mx5`);
  const lordemoji = bot.emojis.find(emoji => emoji.name === `lordpass`);
*/

  let bal = db.fetch(`balance_${user.id}`);

/*
  let astra = db.fetch(`astra_${user.id}`);
  let lordpass = db.fetch(`lord_${user.id}`);
  let overlordpass = db.fetch(`lord2_${user.id}`);
  let mx5 = db.fetch(`mx5_${user.id}`);
  let items = "no";
*/

  if (bal === null) bal = 0;

/*
  if (astra === null) astra = 0;
  if (lordpass === null) lordpass = 0;
  if (overlordpass === null) overlordpass = 0;
  if (mx5 === null) mx5 = 0;
  if (astra >= 1) items += `**${astra}** ` + astraemoji;
  if (lordpass >= 1) items += ` **${lordpass}** ` + lordemoji + ` (1w)`;
  if (overlordpass >= 1) items += ` **${overlordpass}** ` + lordemoji + ` (1mo)`;
  if (mx5 >= 1) items += ` **${mx5}** ` + mx5emoji;
*/  

  const embed = new Discord.MessageEmbed()
    .setTitle(user.tag + " | Stats")
    .addField("💷 Balance", `£${bal}`)
    .setColor(colour)
    .setThumbnail(user.avatarURL())
    .setFooter("Podel, im being held hostage at 40.9015° N, 20.6556° E", bot.user.avatarURL());

 for (var key in json) {

  if (json.hasOwnProperty(key)) {
   
   let emoji = bot.emojis.cache.find(emoji => emoji.name === `${json[key].emoji}`); 
   let item = db.fetch(`${json[key].db}_${user.id}`);  
 
   if (item >= 1) { 
    embed.addField(`${emoji} ${json[key].name}`, `x${item}`);
   }

  }
 }

 await message.channel.send(embed);

/*
if (items === "no") {
    await message.channel.send(embed);
  }
  if (items.includes('**')) {
    await embed.addField("Inventory", items.replace("no", ""));
    await message.channel.send(embed);
  }
*/
};

module.exports.help = {
  name: "stats",
  aliases: ['bal', 'balance', 'profile', 'money', 'wallet'],
  type: "user"
}
