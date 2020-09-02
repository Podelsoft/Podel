const Discord = require('discord.js');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, help) => {
  
  const embed = new Discord.MessageEmbed()
  .setTitle(message.author.tag + ' | Commands List')
  .setDescription('`bazinga`, `podelvid`, `xp`, `changelog`, `info`, `website`, `yep`, `conspiracy`, `yt`, `suggest`, `boiler`, `server`, `podel`, `brick`, `user`, `simp`, `global`, `leaderboard`, `opts`, `apilist`, `kojima`, `daily`, `joblist`, `stats`, `store`, `buy`, `sell`, `lord`, `work`, `drive`, `invite`, `car`, `overlord`, `setcar`, `play`, `add`, `leave`, `skip`, `queue`, `clearqueue`, `volume`, `nowplaying`, `resume`, `pause`, `repeat`')
  .setColor(colour)
  .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL());
  
  const staffembed = new Discord.MessageEmbed()
  .setTitle(message.author.tag + ' | Commands List')
  .setDescription('`bazinga`, `podelvid`, `xp`, `changelog`, `info`, `website`, `yep`, `conspiracy`, `yt`, `suggest`, `boiler`, `server`, `podel`, `brick`, `user`, `simp`, `global`, `leaderboard`, `opts`, `apilist`, `kojima`, `daily`, `joblist`, `stats`, `store`, `buy`, `sell`, `lord`, `work`, `drive`, `invite`, `car`, `overlord`, `setcar`, `play`, `add`, `leave`, `skip`, `queue`, `clearqueue`, `volume`, `nowplaying`, `resume`, `pause`, `repeat`, `warn`, `clearwarn`, `kick`, `ban`, `check`, `clear`, `mute`, `unmute`, `tempban`, `unban`, `msgwarn`, `mutemsg`')
  .setColor(colour)
  .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL());
  
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
