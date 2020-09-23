module.exports.run = async (bot, message, args) => {
    const Discord = require("discord.js");
    const db = require("quick.db");
    const json = require("../items.json");
    const config = require("../config.json"),
          colour = config.colour;

    let user = message.mentions.users.first();

    if (!user) return message.channel.send("you need to mention a user to race with first.");
    if (user.id === message.author.id) return message.channel.send("you can't race yourself.");

    let wager = args[1];

    let bal1 = db.fetch(`balance_${message.author.id}`);
    let bal2 = db.fetch(`balance_${user.id}`);

    if (!wager) return message.channel.send("you need to place a valid wager.");
    if (isNaN(wager)) return message.channel.send("you need to place a valid wager.");
    if (wager <= 0) return message.channel.send("you need to place a valid wager.");
    if ((wager % 1) != 0) return message.channel.send("you need to place a valid wager.");
    if (wager > bal1) return message.channel.send("you don't have enough money for this race.");
    if (wager > bal2) return message.channel.send("that user doesn't have enough money for this race.");

    let car1 = db.fetch(`car_${message.author.id}`);
    let car2 = db.fetch(`car_${user.id}`);

    let check1 = db.fetch(`${car1}_${message.author.id}`);
    let check2 = db.fetch(`${car2}_${user.id}`);

    if (car1 === null) return message.channel.send('You haven\'t set your car. If you don\'t have one, buy one from the `p!dealership`.');
    else
    if (car2 === null) return message.channel.send('That user hasn\'t set their car. If they don\'t have one, they can buy one from the `p!dealership`.');

    if (check1 <= 0) return db.delete(`car_${message.author.id}`),
    message.channel.send('You haven\'t set your car. If you don\'t have one, buy one from the `p!dealership`.');
    else
    if (check2 <= 0) return db.delete(`car_${user.id}`),
    message.channel.send('That user hasn\'t set their car. If they don\'t have one, they can buy one from the `p!dealership`.');
    
    let embedstart = new Discord.MessageEmbed()
    .setAuthor(`${message.author.tag} | Race Invite`, `${message.author.avatarURL()}`)
    .setDescription(`Hey ${user}, ${message.author.tag} has invited you to a drag race for **${wager}** quid. (you have 20 seconds to react with ✅ to accept or ❌ to decline)`)
    .setColor(colour)
    .setTimestamp()
    .setFooter('Podel, do ya thang', bot.user.avatarURL());

    await message.channel.send(embedstart).then(async (startmsg) => {

    await startmsg.react("✅");
    await startmsg.react("❌");

    const filter = (reaction, user) => reaction.emoji.name === "❌" || "✅" && user.id === message.mentions.users.first().id;
    const collector = startmsg.createReactionCollector(filter, { max: 1, time: 20000 });

    collector.on('collect', async (reaction) => {

    if (reaction.emoji.name === "✅") {

    let result = Math.floor((Math.random() * 100) + 0);

    let perc1;
    let perc2;

    // Perc 1
    if (json[car1].grade >= 10) { perc1 === 10 }
    else
    if (json[car1].grade >= 20) { perc1 === 20 }
    else 
    if (json[car1].grade >= 30) { perc1 === 30 }
    else
    if (json[car1].grade >= 40) { perc1 === 40 }
    else
    if (json[car1].grade >= 50) { perc1 === 50 }
    else
    if (json[car1].grade >= 60) { perc1 === 60 }
    else
    if (json[car1].grade >= 70) { perc1 === 70 }
    else
    if (json[car1].grade >= 80) { perc1 === 80 }
    else
    if (json[car1].grade >= 90) { perc1 === 90 }
    else
    if (json[car1].grade >= 100) { perc1 === 100 }; 

    // Perc 2
    if (json[car2].grade >= 10) { perc2 === 10 }
    else
    if (json[car2].grade >= 20) { perc2 === 20 }
    else 
    if (json[car2].grade >= 30) { perc2 === 30 }
    else
    if (json[car2].grade >= 40) { perc2 === 40 }
    else
    if (json[car2].grade >= 50) { perc2 === 50 }
    else
    if (json[car2].grade >= 60) { perc2 === 60 }
    else
    if (json[car2].grade >= 70) { perc2 === 70 }
    else
    if (json[car2].grade >= 80) { perc2 === 80 }
    else
    if (json[car2].grade >= 90) { perc2 === 90 }
    else
    if (json[car2].grade >= 100) { perc2 === 100 };

    let comp1;
    let comp2;

    let chan1;
    let chan2;

    if (perc1 > perc2) { 
        comp1 = perc1 - perc2
        chan1 = 100 - comp1
        if (comp1 < chan1) chan1 = perc1 - perc2, comp1 = 100 - chan1
        chan2 = comp1 
    }
    else
    if (perc2 > perc1) { 
        comp2 = perc2 - perc1
        chan2 = 100 - comp2
        if (comp2 < chan2) chan2 = perc2 - perc1, comp2 = 100 - chan2
        chan1 = comp2 
    }
    else
    if (perc1 === perc2) comp1 = 50, comp2 = 50;

    if (result <= comp1) {
        let emojicar1 = bot.emojis.cache.find(emoji => emoji.name === `${json[car1].emoji}`);
        let embedc1 = new Discord.MessageEmbed()
        .setAuthor(`${message.author.tag} Won!`, `${message.author.avatarURL()}`)
        .setDescription(`+ **£${wager}**`)
        .setThumbnail(`${emojicar1.url}`)
        .setColor(colour)
        .setTimestamp()
        .setFooter('Podel, do ya thang', bot.user.avatarURL());
        message.channel.send(embedc1);
        db.subtract(`balance_${user.id}`, wager);
        db.add(`balance_${message.author.id}`, wager);
    } else if (result <= comp2) {
        let emojicar2 = bot.emojis.cache.find(emoji => emoji.name === `${json[car2].emoji}`);
        let embedc2 = new Discord.MessageEmbed()
        .setAuthor(`${user.tag} Won!`, `${user.avatarURL()}`)
        .setDescription(`+ **£${wager}**`)
        .setThumbnail(`${emojicar2.url}`)
        .setColor(colour)
        .setTimestamp()
        .setFooter('Podel, do ya thang', bot.user.avatarURL());
        message.channel.send(embedc2);
        db.subtract(`balance_${message.author.id}`, wager);
        db.add(`balance_${user.id}`, wager);
    }

   } else if (reaction.emoji.name === "❌") return message.channel.send(`${message.author} rekt ✅.`) 

  });

 });

};

module.exports.help = {
    name: "race"
};