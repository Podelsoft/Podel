const Discord = require('discord.js');
let config = require('../config.json'),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  const embed = new Discord.MessageEmbed()
    .setTitle('v1.4.0 Changelog | 24/9/2020')
    .setDescription(`
  •	 Fixed/Updated commands: p!help, p!rolefind, p!unban, p!unmute, p!mute, p!ban, p!tempban, p!kick, p!msgmute and p!shop.
  •  New commands: p!dealership (to make space for new items on the p!shop), p!race (for car racing).
  •  New cars: the 1985 Audi Sport Quattro S1 and the 2010 Mercedes-Benz McLaren SLR
  •  Added car perfomance stats (top speed, acceleration in 0-100km/h, handling and car grade). 
  •  Fixed p!work ("multipliers won't work" bug).
  •  Other minor code fixes.
  •  Removed p!clear (DEPRECATED)`)
    .setColor(colour)
    .setFooter('Podel, are ya coding son?', bot.user.avatarURL());

  message.channel.send(embed);

}

module.exports.help = {
  name: "changelog",
  type: "user"
}
