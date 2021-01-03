const Discord = require("discord.js");
let config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.MessageEmbed()
    .setTitle("v1.8.2 Changelog | 3/1/2021")
    .setDescription(`
    - Minor code fixes (\`p!leaderboard\` (visual), \`p!buy\`, \`p!sell\`)
    - Added \`p!kodelay\` (\`p!podelay\` but with quotes from \`p!koke\`)`)
    .setColor(colour)
    .setFooter("Podel, are ya coding son?", bot.user.avatarURL());

  message.channel.send(embed);

}

module.exports.help = {
  name: "changelog",
  type: "user"
}
