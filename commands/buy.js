const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json'),
      colour = config.colour;

module.exports.run = async(bot, message, args) => {

let amount = args[1];

//if (!amount) return message.channel.send('you must mention an item to buy from the `p!shop` first.');
  
const astraemoji = bot.emojis.find(emoji => emoji.name === `astra`);
const lordemoji = bot.emojis.find(emoji => emoji.name === `lordpass`);
  
let balance = db.fetch(`balance_${message.author.id}`);

let items = ['astra', 'lordpass'];

switch (args[0]) {
   case 'astra':
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
   break;
  
    case 'lordpass':
      if (amount <= 0) return;
      if (amount === NaN) return;
      if (!amount) return;
      if (balance < 20000 * amount)
        return message.channel.send("you don't have enough money to buy this");
      db.subtract(`balance_${message.author.id}`, 20000 * amount);
      db.add(`lord_${message.author.id}`, amount);
      message.channel.send(
        `added ` +
          "**" +
          amount +
          "**" +
          ` ${lordemoji} to your stats for £${amount * 20000}`
      );
   break;
     default:
      let search = items.find(fatcock => fatcock.includes(args[0]));
      if (search === undefined) return message.channel.send('that item doesn\'t exist');
      message.channel.send(`did you mean: \`${search}\``);
  }
}

module.exports.help = {
  name: "buy"
}
