const Discord = require('discord.js');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, help) => {
  
  const embed = new Discord.RichEmbed()
  .setTitle(message.author.tag + ' | Commands List')
  .setDescription('`bazinga`, `podelvid`, `xp`, `changelog`, `info`, `website`, `yep`, `conspiracy`, `yt`, `suggest`, `boiler`, `server`, `podel`, `brick`, `user`, `simp`, `global`, `leaderboard`, `opts`, `apilist`, `kojima`, `daily`, `joblist`, `stats`, `store`, `buy`, `sell`, `lord`, `work`, `drive`, `invite`, `car`, `overlord`, `setcar`')
  .setColor(colour)
  .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL);
  
  const staffembed = new Discord.RichEmbed()
  .setTitle(message.author.tag + ' | Commands List')
  .setDescription('`bazinga`, `podelvid`, `xp`, `changelog`, `info`, `website`, `yep`, `conspiracy`, `yt`, `suggest`, `boiler`, `server`, `podel`, `brick`, `user`, `simp`, `global`, `leaderboard`, `opts`, `apilist`, `kojima`, `daily`, `joblist`, `stats`, `store`, `buy`, `sell`, `lord`, `work`, `drive`, `invite`, `car`, `overlord`, `setcar`, `warn`, `clearwarn`, `kick`, `ban`, `check`, `clear`, `mute`, `unmute`, `tempban`, `unban`, `msgwarn`')
  .setColor(colour)
  .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL);
  
  if (!message.member.hasPermission('KICK_MEMBERS')) {
    message.channel.send(embed);
  } else if (message.member.hasPermission('KICK_MEMBERS')) {
    if (message.guild.id !== "696515024746709003") return message.channel.send(embed);
    message.channel.send(staffembed)
  }
  
}

module.exports.help = {
  name: "help",
  aliases: ['commands', 'cmds']
}
