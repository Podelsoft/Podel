const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const config = require("../config.json"),
      colour = config.colour;

module.exports.run = async (bot, message, args) => {

  let bal = db.fetch(`balance_${message.author.id}`);  
  
  if (bal === null) bal = 0;

/*    let embed = new Discord.MessageEmbed()
    .setTitle(`Podel Store (you have £${bal})`)
    .setDescription(`List of items/perks you can buy and sell using p!buy or p!sell <itemname> <amount>`)
    .setColor(colour)
    .addField(`astra | ${astraemoji}`, `£1000 | £450`)
    .addField(`lordpass | ${lordemoji} (1 Week)`, `£20000 | £10000`)   
    .addField(`overlordpass | ${lordemoji} (1 month)`, `£80000 | £45000`)
    .setFooter("Podel, tesco e-shop discount on 350ml of heinz ketchup", bot.user.displayAvatarURL);
  
  message.channel.send(embed); */

const json = require('../items.json');

let embed = new Discord.MessageEmbed()
.setTitle(`Podel Store (you have £${bal})`)
.setDescription(`List of items/perks you can buy and sell using p!buy or p!sell <itemname> <amount>`)
.setColor(colour)
.setTimestamp()
.setFooter('Podel, coded by the government of georgia', bot.user.avatarURL())

for (var key in json) {

if (json.hasOwnProperty(key)) {

let emoji = bot.emojis.cache.find(emoji => emoji.name === `${json[key].emoji}`); 
if (json[key].tier){
embed.addField(`${emoji} ${json[key].name}`, `📥 £${json[key].buy} | 📤 £${json[key].sell} | Tier: ${json[key].tier}`);
} else {
embed.addField(`${emoji} ${json[key].name}`, `📥 £${json[key].buy} | 📤 £${json[key].sell}`);
}
}
}

await message.channel.send(embed);

};

module.exports.help = {
  name: "store",
  aliases: ['shop', 'market', 'tesco']
};
