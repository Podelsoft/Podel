const Discord = require('discord.js');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
    
  let user = bot.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) || message.mentions.users.first();
  
  if (!user) user = message.author;
  if (user.id === bot.user.id) user = message.author;

  let podelemoji = bot.emojis.cache.find(emoji => emoji.name === `podel`);
  
   var xp = require("../xp.json");

  if(!xp[user.id]){
    xp[user.id] = {
      xp: 0,
      level: 1
    };
  }

  let curxp = xp[user.id].xp;
  let curlvl = xp[user.id].level;
  let nxtlvl = 5 * (xp[user.id].level * xp[user.id].level) + 50 * xp[user.id].level + 100;
  
  const progress = (curxp % 1000) / 1000;
  const progressOutOf10 = Math.round(progress * 10);

  const barStr = `${'🟢'.repeat(progressOutOf10)}${'🔴'.repeat(10 - progressOutOf10)}`;
      
      const embed = new Discord.MessageEmbed()
        .setTitle(user.tag + " | Stats")
        .addField("Messages", `${curxp}`)
        .addField("Podel LVL", `${curlvl}${podelemoji}`)
        .addField("Messages Remaining", `${curxp}/${nxtlvl}`)
        .addField("Progress", `${barStr}`)
        .setColor(colour)
        .setThumbnail(user.displayAvatarURL())
        .setFooter(
          "Podel, the kid who types !rank every 15 mins",
          bot.user.avatarURL()
        );

      await message.channel.send(embed);
  
}

module.exports.help = {
  name: "rank",
  aliases: ['xp']
}
