const db = require("quick.db");
const Discord = require("discord.js"); 
const config = require("../config.json"),
      colour = config.colour;

module.exports.run = async(bot, message, args) => {
    
let bal = db.fetch(`balance_${message.author.id}`);  
  
if (bal === null) bal = 0;

const json = require('../items.json');

const gauge = bot.emojis.cache.find(emoji => emoji.name === `gauge`); 
const steeringwheel = bot.emojis.cache.find(emoji => emoji.name === `steeringwheel`); 

if (args[0]) {

  if (json[args[0]]) {
    let emoji = bot.emojis.cache.find(emoji => emoji.name === `${json[args[0]].emoji}`); 
    let embed = new Discord.MessageEmbed()
    .setAuthor(`${json[args[0]].name}`, `${emoji.url}`)
    .addFields({name:`Buying Price 📥`, value: `£${json[args[0]].buy}`, inline: true})
    .addFields({name: `Selling Price 📤`, value: `£${json[args[0]].sell}`, inline: true})
    .addFields({name: `Database Name 🖥️`, value: `\`${json[args[0]].db}\``, inline: false})
    .addFields({name: `Emoji Name 📝`, value: `\`${json[args[0]].emoji}\``, inline: false})
    .addFields({name: `Top Speed ${gauge}`, value: `**${json[args[0]].max}** km/h`, inline: false})
    .addFields({name: `Acceleration 🔥`, value: `**${json[args[0]].acceleration}s** (0-100km/h)`, inline: false})
    .addFields({name: `Handling ${steeringwheel}`, value: `**${json[args[0]].handling}**`, inline: false})
    .addFields({name: `Grade 🏆`, value: `**${json[args[0]].grade}/100**`, inline: true})
    .addFields({name: `Tier ⬆️`, value: json[args[0]].tier, inline: true})
    .setColor(colour)
    .setTimestamp()
    .setFooter('Podel, wheela deela', bot.user.avatarURL());
    message.channel.send(embed);
  } else { return message.channel.send("that car doesn't exist.") }

} else { 

let embed = new Discord.MessageEmbed()
.setTitle(`Podel City Dealership (you have £${bal})`)
.setColor(colour)
.setTimestamp()
.setFooter('Podel, wheela deela', bot.user.avatarURL())

let output = [];

for (var key in json) {

if (json.hasOwnProperty(key)) {

if (json[key].tier){
output.push(`${key} | ${json[key].buy} | ${json[key].sell}`);
}

}

}
  
  let p = output.join("\n ");
  embed.setDescription(p.slice(0, 124));
  
  async function m1() {
    await message.channel.send(embed)
     .then(async (m) => {
     await m.react("1️⃣");
     await m.react("2️⃣");
     await m.react("3️⃣");
     await m.react("4️⃣");
     await m.react("5️⃣");
     const filter = (reaction, user) => reaction.emoji.name === "5️⃣" || "4️⃣" || "3️⃣" || "2️⃣" || "1️⃣" && user.id === message.author.id;
     const collector = m.createReactionCollector(filter, { max: 10, time: 2 * 60 * 1000 });

     collector.on('collect', async (reaction, user) => {

      const userReactions = m.reactions.cache.filter(reaction => reaction.users.cache.has(user.id));

      for (const reaction of userReactions.values()) {
        await reaction.users.remove(user.id);
      }

      let embed1 = new Discord.MessageEmbed()
      .setTitle(`Podel City Dealership (you have £${bal})`)
      .setDescription(p.slice(0, 124))
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, wheela deela', bot.user.avatarURL());

      let embed2 = new Discord.MessageEmbed()
      .setTitle(`Podel City Dealership (you have £${bal})`)
      .setDescription(p.slice(125, 335))
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, wheela deela', bot.user.avatarURL());

      let embed3 = new Discord.MessageEmbed()
      .setTitle(`Podel City Dealership (you have £${bal})`)
      .setDescription(p.slice(336, 455))
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, wheela deela', bot.user.avatarURL());

      let embed4 = new Discord.MessageEmbed()
      .setTitle(`Podel City Dealership (you have £${bal})`)
      .setDescription(p.slice(455, 482))
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, wheela deela', bot.user.avatarURL());

      let embed5 = new Discord.MessageEmbed()
      .setTitle(`Podel City Dealership (you have £${bal})`)
      .setDescription(p.slice(482, 510))
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, wheela deela', bot.user.avatarURL());

      if (reaction.emoji.name === "1️⃣") {
        m.edit(embed1);
      } else if (reaction.emoji.name === "2️⃣") {
        m.edit(embed2);
      } else if (reaction.emoji.name === "3️⃣") {
        m.edit(embed3);
      } else if (reaction.emoji.name === "4️⃣") {
        m.edit(embed4);
      } else if (reaction.emoji.name === "5️⃣") {
        m.edit(embed5);
      }
    });
   })
  }

  m1();
}
};

module.exports.help = {
    name: "dealership",
    type: "user"
};