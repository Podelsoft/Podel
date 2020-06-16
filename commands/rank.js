const Discord = require('discord.js');
const db = require('quick.db');
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
    
  let user = message.mentions.users.first() || message.author;
  
  if (!user) return;
  
  let podelemoji = bot.emojis.find(emoji => emoji.name === `podel`);
  let sgtemoji = bot.emojis.find(emoji => emoji.name === `sgt`);
  
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
  
  const greenemoji = bot.emojis.find(emoji => emoji.name === `green00213`);
  const redemoji = bot.emojis.find(emoji => emoji.name === `red00213`);
  const x = "□";
  const barStr = `${'🟢'.repeat(progressOutOf10)}${'🔴'.repeat(10 - progressOutOf10)}`;
      
      const embed = new Discord.RichEmbed()
        .setTitle(user.tag + " | Stats")
        .addField("Messages", `${curxp}`)
        .addField("Podel LVL", `${curlvl}${podelemoji}`)
        .addField("Messages Remaining", `${curxp}/${nxtlvl}`)
        .addField("Progress", `${barStr}`)
        .setColor(colour)
        .setThumbnail(user.avatarURL)
        .setFooter(
          "Podel, coded by the government of georgia",
          bot.user.avatarURL
        );

      await message.channel.send(embed);
  
}

module.exports.help = {
  name: "rank",
  aliases: ['xp']
}