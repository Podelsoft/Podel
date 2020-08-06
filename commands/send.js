const Discord = require('discord.js');
const db = require('quick.db');
const config = require('../config.json'),
      colour = config.colour;

module.exports.run = async (bot, message, args, tools) => {  

  if (!message.mentions.members.first()) return message.channel.send(`mention someone first`);
    
  let targetMember = message.mentions.members.first(),
      amount = parseInt(args[1]);
  
  if(targetMember.bot) return message.reply(`you can't give money to bots`);
  
  if (isNaN(amount)) return;
  
  let targetBalance = await db.fetch(`balance_${targetMember.id}`),
      selfBalance = await db.fetch(`balance_${message.author.id}`);
  
  if (targetBalance === null) targetBalance = 0;
  if (selfBalance === null) selfBalance = 0;
  
  if (amount > selfBalance) return message.channel.send(`you can't make that transaction`);
  
  if (amount < 0) return;
  
  db.add(`balance_${targetMember.id}`, amount);
  db.subtract(`balance_${message.author.id}`, amount);
  
  let transactioncode = Math.floor(Math.random() * 1000000000);
  
  let embed = new Discord.RichEmbed()
  .setColor(colour)
  .setTitle('Code: ' + transactioncode)
  .setAuthor(message.author.tag, message.author.displayAvatarURL)
  .setDescription(`sent **£${amount}** to \`${targetMember.user.username}\``)
  .setTimestamp()
  .setFooter(`Podel, coded by the government of georgia`, bot.user.displayAvatarURL);

  await bot.guilds.get("644551231020204062").channels.get("715210857197338684").send(embed);
  await message.channel.send(embed);
}

module.exports.help = {
  name: "send",
  aliases: ['pay', 'transfer']
}
