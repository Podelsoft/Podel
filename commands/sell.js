const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json'),
      colour = config.colour;

module.exports.run = async(bot, message, args) => {

let amount = args[1];
  
let balance = db.fetch(`balance_${message.author.id}`);
let astra = db.fetch(`astra_${message.author.id}`);
let lordpass = db.fetch(`lord_${message.author.id}`);
  
const astraemoji = bot.emojis.find(emoji => emoji.name === `astra`);
const lordemoji = bot.emojis.find(emoji => emoji.name === `lordpass`);

    if (args[0] === "astra") {
      if (astra < amount) return message.channel.send('check your inventory again');
      if (amount <= 0) return;
      if (amount === NaN) return;
      if (!amount) return;
      db.add(`balance_${message.author.id}`, 450 * amount);
      db.subtract(`astra_${message.author.id}`, amount);
      message.channel.send(
        `sold ` +
          "**" +
          amount +
          "**" +
          ` ${astraemoji} for £${amount * 450}`
      );
    }
  
  if (args[0] === "lordpass") {
      if (lordpass < amount) return message.channel.send('check your inventory again');
      if (amount <= 0) return;
      if (amount === NaN) return;
      if (!amount) return;
      db.add(`balance_${message.author.id}`, 1200 * amount);
      db.subtract(`lord_${message.author.id}`, amount);
      message.channel.send(
        `sold ` +
          "**" +
          amount +
          "**" +
          ` ${lordemoji} for £${amount * 1200}`
      );
    }
  
}

module.exports.help = {
  name: "sell"
}