const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {
  let amount = args[0];
  
  let lordpass = db.fetch(`lord2_${message.author.id}`);

  const lordemoji = bot.emojis.cache.find(emoji => emoji.name === `lordpass`);

  let lordcode = Math.floor(Math.random() * 1000000000);

  let role = message.guild.roles.cache.find(role => role.id === "713086695071023161");
  if (lordpass < amount)
    return message.channel.send("check your inventory again");
  if (amount <= 0) return;
  if (amount === NaN) return;
  if (!amount) return;
  db.subtract(`lord2_${message.author.id}`, amount);
  message.channel.send(`lording activated for ${args[0]} month(s) (${lordcode})`);
  await message.member.roles.add(role);
  await bot.guilds.cache
    .get("644551231020204062")
    .channels.cache.get("715368997725667398")
    .send(
      `${message.author.tag} just started overlording (${
        args[0]
      } month(s) | Lord Code ${lordcode})`
    );
/*  setTimeout(function() {
    let role = message.guild.roles.find(
      role => role.name === "House of Lords"
    );
    message.member.removeRole(role);
    bot.guilds
      .get("644551231020204062")
      .channels.get("715368997725667398")
      .send(
        `${message.author.tag} is not overlording anymore (lording lasted ${
          args[0]
        } month(s) | Lord Code: ${lordcode})`
      );
  }, 2.628e+9 * args[0]); */
};

module.exports.help = {
  name: "overlord"
}
