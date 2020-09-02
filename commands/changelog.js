const Discord = require('discord.js');
let config = require('../config.json'),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {

  let podelemoji = bot.emojis.cache.find(emoji => emoji.name === `podel`);

  const embed = new Discord.MessageEmbed()
    .setTitle('v1.3.0 Changelog | 2/9/2020')
    .setDescription(`
  •	 Updated to v12 of Discord.js and updated all modules.
  •	 Updated p!play (works as a first song command only).
  •	 Removed useless marked out code on podel.js.
  •	 Moved hosts.
  •	 New Commands: p!add <song> (use after the first song), p!volume <0-1000>, p!skip, p!np, p!queue, p!clearqueue, p!resume, p!pause, p!repeat <on/off>.
  •	 New Cars: the 2009 Scion xD, the 2007 Buick LaCrosse, the 2008 Pontiac Solstice, the 2004 Pontiac Aztec, the 2009 Chrysler PT Cruiser, the 2009 Chevrolet Malibu and the 2009 Volkswagen Rabbit.
  •	 Podel bot can now save deleted images too (plus images with messages).
  •	 visit bot.podelsoft.com for status updates.`, { code: 'diff' })
    .setColor(colour)
    .setFooter('Podel, are ya coding son?', bot.user.avatarURL());

  message.channel.send(embed);

}

module.exports.help = {
  name: "changelog"
}
