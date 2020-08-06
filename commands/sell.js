const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json'),
      colour = config.colour;

module.exports.run = async(bot, message, args) => {

let amount = args[1];

let items = ['astra', 'lordpass'];

//if (!amount) return message.channel.send('you must mention an item to sell from the `p!shop` first.');
  
let balance = db.fetch(`balance_${message.author.id}`);
let astra = db.fetch(`astra_${message.author.id}`);
let lordpass = db.fetch(`lord_${message.author.id}`);
  
const astraemoji = bot.emojis.find(emoji => emoji.name === `astra`);
const lordemoji = bot.emojis.find(emoji => emoji.name === `lordpass`);

switch (args[0]) {
   case 'astra':
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
   break;
  
   case 'lordpass':
      if (lordpass < amount) return message.channel.send('check your inventory again');
      if (amount <= 0) return;
      if (amount === NaN) return;
      if (!amount) return;
      db.add(`balance_${message.author.id}`, 10000 * amount);
      db.subtract(`lord_${message.author.id}`, amount);
      message.channel.send(
        `sold ` +
          "**" +
          amount +
          "**" +
          ` ${lordemoji} for £${amount * 10000}`
      );
   break;
default:
      let search = items.find(fatcock => fatcock.includes(args[0]));
      if (search === undefined) return message.channel.send('that item doesn\'t exist');
      message.channel.send(`did you mean: \`${search}\``);
  }
}

module.exports.help = {
  name: "sell"
}
