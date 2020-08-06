const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {

  if (!args[0]) return message.reply('you need to provide a valid user ID');
  if (!args[1]) return message.reply('you need to provide a valid amount of XP to remove');
  if (isNaN(args[1])) return message.reply('you need to provide a valid amount of XP to remove');
  if (isNaN(args[0])) return message.reply('you need to provide a valid ID to remove XP from');  

  const fs = require('fs');

  let xp = require('../xp.json');

  xp[args[0]].xp = xp[args[0]].xp - args[1]; 

  fs.writeFile("../xp.json", JSON.stringify(xp), err => {
    if (err) console.log(err);
  });

  message.channel.send('removed ' + args[1] + ' XP from ID ' + args[0]);

}

module.exports.help = {
   name: "rmxp"
}
