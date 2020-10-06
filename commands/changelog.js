const Discord = require("discord.js");
let config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.MessageEmbed()
    .setTitle("v1.4.5 Changelog | 6/10/2020")
    .setDescription(`
  •	 Fixed/Updated commands: p!race, p!dealership, p!help, p!leaderboard, p!msgmute and p!msgwarn.
  •  Added command types to all commands (for p!help).
  •  Status monitor was removed due to terminal pollution, code is still there, feel free to make any pull requests.
  •  Other minor code fixes.`)
    .setColor(colour)
    .setFooter("Podel, are ya coding son?", bot.user.avatarURL());

  message.channel.send(embed);

}

module.exports.help = {
  name: "changelog",
  type: "user"
}
