const Discord = require("discord.js");
const db = require("quick.db");
let config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {
  let user = bot.users.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) || message.mentions.users.first();

  if (!user) user = message.author;
  if (user.tag === "Podel#8232") user = message.author;

  const astraemoji = bot.emojis.find(emoji => emoji.name === `astra`);
  const lordemoji = bot.emojis.find(emoji => emoji.name === `lordpass`);

  let bal = db.fetch(`balance_${user.id}`);
  let lost = db.fetch(`losses_${user.id}`);
  let won = db.fetch(`wins_${user.id}`);
  let astra = db.fetch(`astra_${user.id}`);
  let lordpass = db.fetch(`lord_${user.id}`);
  let overlordpass = db.fetch(`lord2_${user.id}`);
  let items = "no";

  if (bal === null) bal = 0;
  if (lost === null) lost = 0;
  if (won === null) won = 0;
  if (astra === null) astra = 0;
  if (lordpass === null) lordpass = 0;
  if (overlordpass === null) overlordpass = 0;
  if (astra >= 1) items += `**${astra}** ` + astraemoji;
  if (lordpass >= 1) items += ` **${lordpass}** ` + lordemoji + ` (1w)`;
  if (overlordpass >= 1) items += ` **${overlordpass}** ` + lordemoji + ` (1mo)`;

  const embed = new Discord.RichEmbed()
    .setTitle(user.tag + " | Stats")
    .addField("Balance", `£${bal}`)
    /* .addField("Matches Won", `${won}`)
    .addField("Matches Lost", `${lost}`) */
    .setColor(colour)
    .setThumbnail(user.avatarURL)
    .setFooter("Podel, im being held hostage at 40.9015° N, 20.6556° E", bot.user.avatarURL);

  if (items === "no") {
    await message.channel.send(embed);
  }
  if (items.includes('**')) {
    await embed.addField("Inventory", items.replace("no", ""));
    await message.channel.send(embed);
  }
};

module.exports.help = {
  name: "stats",
  aliases: ['bal', 'balance', 'profile', 'money']
}
