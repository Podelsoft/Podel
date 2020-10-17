const db = require("quick.db"),
  ms = require("parse-ms");

module.exports.run = async (bot, message, args, tools) => {
  let cooldown = 43200000,
    amount = 100;

  let lastDaily = await db.fetch(`dailycd_${message.author.id}`);

  if (lastDaily !== null && cooldown - (Date.now() - lastDaily) > 0) {
    let timeObj = ms(cooldown - (Date.now() - lastDaily));

    message.reply(`you have already collected your daily 100 quid mate, please wait ${timeObj.hours}h ${timeObj.minutes}m`);
  } else {
    message.channel.send(`added £100 to your stats cheers`);

    db.set(`dailycd_${message.author.id}`, Date.now());
    db.add(`balance_${message.author.id}`, amount);
  }
}
module.exports.help = {
  name: "daily",
  aliases: ["d", "dailies"],
  type: "user"
}