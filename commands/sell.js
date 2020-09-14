const db = require('quick.db');

module.exports.run = async(bot, message, args) => {

let amount = args[1];

let itemname = args[0];

const itemlist = require('../items.json');
const item = itemlist[itemname];

if (!item) return;

let total = item.sell * amount;
let price = `${total}` * 1;
let dbname = item.db;
let name = item.name;
let emoji = bot.emojis.cache.find(emoji => emoji.name === `${item.emoji}`);
let itemtot = db.fetch(`${dbname}_${message.author.id}`);

if (amount < 0) return;
if (isNaN(amount)) return;

 if (itemtot < amount) return message.channel.send(`you don't have enough ${emoji} (${name}) to sell`);
 db.add(`balance_${message.author.id}`, price);
 db.subtract(`${dbname}_${message.author.id}`, amount);
 message.channel.send(`sold **${amount}** ${emoji} ${name} for £${price}`);
  
}

module.exports.help = {
  name: "sell"
}
