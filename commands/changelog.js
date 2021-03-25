const Discord = require("discord.js");
let config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.MessageEmbed()
    .setTitle("v1.8.3 Changelog | 25/3/2021")
    .setDescription(`
    - Minor change (\`p!daily\`)
    - Major re-write (\`p!drive\`)`)
    .setColor(colour)
    .setFooter("Podel, are ya coding son?", bot.user.avatarURL());
  message.channel.send(embed);

}

module.exports.help = {
  name: "changelog",
  type: "user"
}
