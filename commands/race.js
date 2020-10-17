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
    if ((wager % 1) !== 0) return message.channel.send("you need to place a valid wager.");
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
        .setDescription(`Hey ${user}, ${message.author.tag} has invited you to a drag race for **${wager}** quid. (20 seconds until the race start, react with ✅ to accept or ❌ to decline)`)
        .setColor(colour)
        .setTimestamp()
        .setFooter('Podel, do ya thang', bot.user.avatarURL());

    async function start() {

        let cperc1 = db.fetch(`perc_${message.author.id}`);
        let cperc2 = db.fetch(`perc_${user.id}`)

        if (!cperc1) return message.channel.send("You need to reset your car. `(no perc)`")
        else
            if (!cperc2) return message.channel.send("That user needs to reset their car. `(no perc)`");

        let perc1 = parseInt(cperc1);
        let perc2 = parseInt(cperc2);

        let gdiff;
        gdiff = perc1 - perc2;

        message.channel.send(embedstart).then(async (startmsg) => {

            await startmsg.react("✅");
            await startmsg.react("❌");

            startmsg.awaitReactions((reaction, user) => user.id === message.mentions.users.first().id && (reaction.emoji.name === "✅" || "❌"), { max: 1, time: 20000 })
                .then(async (collected) => {

                    if (collected.first().emoji.name === "✅") {

                        let result = (Math.random() * 200) + gdiff - 100;

                        if (result >= 0) {
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
                        } else if (result < 0) {
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

                    } else if (collected.first().emoji.name === "❌") return message.channel.send(`${message.author} rekt ✅`)

                })
                .catch(() => {
                    message.channel.send(`Race Stopped: \`Timed Out\``);
                });

        });

    }

    start();
};

module.exports.help = {
    name: "race",
    type: "user"
};