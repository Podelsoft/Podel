const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json'),
      colour = config.colour;

module.exports.run = async(bot, message, args) => {

let amount = args[1];
  
const astraemoji = bot.emojis.find(emoji => emoji.name === `astra`);
const lordemoji = bot.emojis.find(emoji => emoji.name === `lordpass`);
  
let balance = db.fetch(`balance_${message.author.id}`);

    if (args[0] === "astra") {
      if (amount <= 0) return;
      if (amount === NaN) return;
      if (!amount) return;
      if (balance < 1000 * amount)
        return message.channel.send("you don't have enough money to buy this");
      db.subtract(`balance_${message.author.id}`, 1000 * amount);
      db.add(`astra_${message.author.id}`, amount);
      message.channel.send(
        `added ` +
          "**" +
          amount +
          "**" +
          ` ${astraemoji} to your stats for £${amount * 1000}`
      );
    }
  
  if (args[0] === "lordpass") {
      if (amount <= 0) return;
      if (amount === NaN) return;
      if (!amount) return;
      if (balance < 2000 * amount)
        return message.channel.send("you don't have enough money to buy this");
      db.subtract(`balance_${message.author.id}`, 2000 * amount);
      db.add(`lord_${message.author.id}`, amount);
      message.channel.send(
        `added ` +
          "**" +
          amount +
          "**" +
          ` ${lordemoji} to your stats for £${amount * 2000}`
      );
    }
  
}

module.exports.help = {
  name: "buy"
}
