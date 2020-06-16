const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const config = require("../config.json"),
      colour = config.colour;

module.exports.run = async (bot, message, args) => {

  const astraemoji = bot.emojis.find(emoji => emoji.name === `astra`);
  const lordemoji = bot.emojis.find(emoji => emoji.name === `lordpass`);

  const balance = db.fetch(`balance_${message.author.id}`);
  const bal = db.fetch(`balance_${message.author.id}`);
  const item = db.fetch(`item_${message.author.id}`);
  
  if (bal === null) bal = 0;
  
  let embed = new Discord.RichEmbed()
    .setTitle(`Podel Store (you have £${bal})`)
    .setDescription(`List of items/perks you can buy and sell using p!buy or p!sell <itemname> <amount>`)
    .setColor(colour)
    .addField(`${astraemoji}`, `£1000 | £450`)
    .addField(`${lordemoji} (1 Week)`, `£2000 | £1200`, true)
    .setFooter("Podel, coded by the government of georgia", bot.user.displayAvatarURL);
  
  message.channel.send(embed)
  
};

module.exports.help = {
  name: "store",
  aliases: ['shop', 'market', 'tesco']
};
