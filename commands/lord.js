const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {
  let amount = args[0];
  
  let lordpass = db.fetch(`lord_${message.author.id}`);

  const lordemoji = bot.emojis.find(emoji => emoji.name === `lordpass`);

  let lordcode = Math.floor(Math.random() * 1000000000);

  let role = message.guild.roles.find(role => role.id === "713086695071023161");
  if (lordpass < amount)
    return message.channel.send("check your inventory again");
  if (amount <= 0) return;
  if (amount === NaN) return;
  if (!amount) return;
  db.subtract(`lord_${message.author.id}`, amount);
  message.channel.send(`lording activated for ${args[0]} week(s) (${lordcode})`);
  await message.member.addRole(role);
  await bot.guilds
    .get("644551231020204062")
    .channels.get("715368997725667398")
    .send(
      `${message.author.tag} just started lording (${
        args[0]
      } week(s) | Lord Code ${lordcode})`
    );
  setTimeout(function() {
    let role = message.guild.roles.find(
      role => role.name === "House of KSI"
    );
    message.member.removeRole(role);
    bot.guilds
      .get("644551231020204062")
      .channels.get("715368997725667398")
      .send(
        `${message.author.tag} is not lording anymore (lording lasted ${
          args[0]
        } week(s) | Lord Code: ${lordcode})`
      );
  }, 1814.4e6 * args[0]);
};

module.exports.help = {
  name: "lord"
}
