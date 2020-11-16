const db = require('quick.db');

module.exports.run = async (bot, message, args) => {

  let itemname = args[0];
  let amount = args[1];

  const itemlist = require('../items.json');
  const item = itemlist[itemname];

  const car = db.fetch(`car_${message.author.id}`);

  if (!amount) amount = 1;
  if (!item) { return message.channel.send("that item does not exist.") }

  let total = item.sell * amount;
  let price = `${total}` * 1;
  let dbname = item.db;
  let name = item.db;
  let emoji = bot.emojis.cache.find(emoji => emoji.name === `${item.emoji}`);
  let itemtot = db.fetch(`${dbname}_${message.author.id}`);

  if ((amount % 1) != 0) return;
  if (amount < 1) return;
  if (isNaN(amount)) return;

  if (itemtot < amount) return message.channel.send(`you don't have enough ${emoji} ${name} to sell.`);
  if (itemtot === amount && item.db === String(car)) db.delete(`car_${message.author.id}`);
  db.add(`balance_${message.author.id}`, price);
  db.subtract(`${dbname}_${message.author.id}`, amount);
  message.channel.send(`sold **${amount}** ${emoji} ${name} for £${price}`);

}

module.exports.help = {
  name: "sell",
  type: "user"
}
