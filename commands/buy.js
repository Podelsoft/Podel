const db = require('quick.db');

module.exports.run = async (bot, message, args) => {

  let balance = db.fetch(`balance_${message.author.id}`);

  let itemname = args[0].toLowerCase();
  let amount = args[1];

  const itemlist = require('../items.json');
  const item = itemlist[itemname];

  if (!amount) amount = 1;
  if (!item) { return message.channel.send("that item does not exist.") }

  let total = item.buy * amount;
  let price = `${total}` * 1;
  let dbname = item.db;
  let name = item.name;
  let emoji = bot.emojis.cache.find(emoji => emoji.name === `${item.emoji}`);

  if ((amount % 1) !== 0) { return }
  if (amount < 1) { return }
  if (isNaN(amount)) { return }

  if (price > balance) return message.channel.send('you don\'t have enough to buy this, smelly idiot.');
  db.add(`${dbname}_${message.author.id}`, amount);
  db.set(`balance_${message.author.id}`, balance - price);
  message.channel.send(`added **${amount}** ${emoji} ${name} to your stats for £${price}`);

}

module.exports.help = {
  name: "buy",
  type: "user"
}
