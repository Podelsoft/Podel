const Discord = require("discord.js");
let config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.MessageEmbed()
    .setTitle("v1.8.0 Changelog | 11/11/2020")
    .setDescription(`
    - Fixed \`p!leaderboard\`, no more \`bot.users.cache\`
    - Fixed buying and selling 1 with no number in the end for commands \`p!buy\` and \`p!sell\`
    - Fixed \`p!unmute\` and added a DM whenever a user gets unmuted
    - Fixed the embed field limitations for inventories (by adding a separate command)
    - Added \`p!reimu\`, \`p!delay\`, \`p!podelay\`, \`p!stockphoto\`, \`p!stockvideo\`, \`p!empire\`, \`p!open\`, \`p!inventory\`
    - Added lootboxes (Tier 1 and Tier 2)
    - Added online **XP** and **Balance** leaderboards [here](https://podel.cristpz.eu/leaderboard/xp)
    - Updated and fixed \`p!banlist\`
    - Fixed all **Music** commands and added \`p!remove\` to remove songs from server queues
    - Fixed both \`p!msgwarn\` and \`p!msgmute\` commands`)
    .setColor(colour)
    .setFooter("Podel, are ya coding son?", bot.user.avatarURL());

  message.channel.send(embed);

}

module.exports.help = {
  name: "changelog",
  type: "user"
}
