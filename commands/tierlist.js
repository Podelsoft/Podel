module.exports.run = async (bot, message, args) => {
  const Discord = require("discord.js");
  const config = require("../config.json"),
    colour = config.colour;

  let embed = new Discord.MessageEmbed()
    .setTitle('Podel Car Tier List')
    .setDescription('This is the list of car tiers and their perks')
    .setColor(colour)
    .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL())
    .addField('Tier 1', 'Unlocks p!drive and gives you double p!work money.')
    .addField('Tier 2', 'Tier 1 + x2 p!drive money.')
    .addField('Tier 3', 'Tier 1 + x4 p!drive money.')
    .addField('Tier 4', 'Tier 1 + x8 p!drive money.')
    .addField('Tier 5', 'Tier 1 + x100 p!drive money.');

  message.channel.send(embed);
};

module.exports.help = {
  name: "tierlist",
  aliases: ["tier", "tiers"],
  type: "user"
}