const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../config.json"),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {

    let itemname = args[0];

    const itemlist = require('../items.json');
    const item = itemlist[itemname];

    if (!item || !itemname) return message.channel.send("enter a valid lootbox name.");

    let dbname = item.db;
    let emoji = bot.emojis.cache.find(emoji => emoji.name === `${item.emoji}`);
    let itemtot = db.fetch(`${dbname}_${message.author.id}`);

    if (dbname === "basiclb") {

        if (itemtot < 1) return message.channel.send(`you don't have enough ${emoji} to open.`);

        let num = Math.floor(Math.random() * 100) + 1;

        if (num > 90) {
            let index = Object.keys(itemlist);
            while (true) {
                let randomItem = index[Math.floor(Math.random() * index.length)];
                if (itemlist[randomItem].tier === "1" && itemlist[randomItem].lb === "2") {
                    db.subtract(`basiclb_${message.author.id}`, 1);
                    db.add(`${randomItem}_${message.author.id}`, 1);
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(`${itemlist[randomItem].name}`)
                        .setDescription(`${itemlist[randomItem].sell - 800}`)
                        .setThumbnail(bot.emojis.cache.find(emoji => emoji.name === `${randomItem}`).url)
                        .setColor(colour)
                    message.channel.send(embed);
                    return;
                }
            }
        } else if (num >= 40 && num < 90) {
            let index = Object.keys(itemlist);
            while (true) {
                let randomItem = index[Math.floor(Math.random() * index.length)];
                if (itemlist[randomItem].tier === "1" && itemlist[randomItem].lb === "4") {
                    db.subtract(`basiclb_${message.author.id}`, 1);
                    db.add(`${randomItem}_${message.author.id}`, 1);
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(`${itemlist[randomItem].name}`)
                        .setDescription(`${itemlist[randomItem].sell - 800}`)
                        .setThumbnail(bot.emojis.cache.find(emoji => emoji.name === `${randomItem}`).url)
                        .setColor(colour)
                    message.channel.send(embed);
                    return;
                }
            }
        } else if (num >= 10 && num < 40) {
            let index = Object.keys(itemlist);
            while (true) {
                let randomItem = index[Math.floor(Math.random() * index.length)];
                if (itemlist[randomItem].tier === "1" && itemlist[randomItem].lb === "3") {
                    db.subtract(`basiclb_${message.author.id}`, 1);
                    db.add(`${randomItem}_${message.author.id}`, 1);
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(`${itemlist[randomItem].name}`)
                        .setDescription(`${itemlist[randomItem].sell - 800}`)
                        .setThumbnail(bot.emojis.cache.find(emoji => emoji.name === `${randomItem}`).url)
                        .setColor(colour)
                    message.channel.send(embed);
                    return;
                }
            }
        } else if (num >= 1 && num < 10) {
            let index = Object.keys(itemlist);
            while (true) {
                let randomItem = index[Math.floor(Math.random() * index.length)];
                if (itemlist[randomItem].tier === "1" && itemlist[randomItem].lb === "1") {
                    db.subtract(`basiclb_${message.author.id}`, 1);
                    db.add(`${randomItem}_${message.author.id}`, 1);
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(`${itemlist[randomItem].name}`)
                        .setDescription(`${itemlist[randomItem].sell - 800}`)
                        .setThumbnail(bot.emojis.cache.find(emoji => emoji.name === `${randomItem}`).url)
                        .setColor(colour)
                    message.channel.send(embed);
                    return;
                }
            }
        }
    } else if (dbname === "betterlb") {

        if (itemtot < 1) return message.channel.send(`you don't have enough ${emoji} to open.`);

        let num = Math.floor(Math.random() * 100) + 1;

        if (num > 90) {
            let index = Object.keys(itemlist);
            while (true) {
                let randomItem = index[Math.floor(Math.random() * index.length)];
                if (itemlist[randomItem].tier === "2" && itemlist[randomItem].lb === "2") {
                    db.subtract(`betterlb_${message.author.id}`, 1);
                    db.add(`${randomItem}_${message.author.id}`, 1);
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(`${itemlist[randomItem].name}`)
                        .setDescription(`${itemlist[randomItem].sell - 3000}`)
                        .setThumbnail(bot.emojis.cache.find(emoji => emoji.name === `${randomItem}`).url)
                        .setColor(colour)
                    message.channel.send(embed);
                    return;
                }
            }
        } else if (num >= 40 && num < 90) {
            let index = Object.keys(itemlist);
            while (true) {
                let randomItem = index[Math.floor(Math.random() * index.length)];
                if (itemlist[randomItem].tier === "2" && itemlist[randomItem].lb === "4") {
                    db.subtract(`betterlb_${message.author.id}`, 1);
                    db.add(`${randomItem}_${message.author.id}`, 1);
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(`${itemlist[randomItem].name}`)
                        .setDescription(`${itemlist[randomItem].sell - 3000}`)
                        .setThumbnail(bot.emojis.cache.find(emoji => emoji.name === `${randomItem}`).url)
                        .setColor(colour)
                    message.channel.send(embed);
                    return;
                }
            }
        } else if (num >= 10 && num < 40) {
            let index = Object.keys(itemlist);
            while (true) {
                let randomItem = index[Math.floor(Math.random() * index.length)];
                if (itemlist[randomItem].tier === "2" && itemlist[randomItem].lb === "3") {
                    db.subtract(`betterlb_${message.author.id}`, 1);
                    db.add(`${randomItem}_${message.author.id}`, 1);
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(`${itemlist[randomItem].name}`)
                        .setDescription(`${itemlist[randomItem].sell - 3000}`)
                        .setThumbnail(bot.emojis.cache.find(emoji => emoji.name === `${randomItem}`).url)
                        .setColor(colour)
                    message.channel.send(embed);
                    return;
                }
            }
        } else if (num >= 1 && num < 10) {
            let index = Object.keys(itemlist);
            while (true) {
                let randomItem = index[Math.floor(Math.random() * index.length)];
                if (itemlist[randomItem].tier === "2" && itemlist[randomItem].lb === "1") {
                    db.subtract(`betterlb_${message.author.id}`, 1);
                    db.add(`${randomItem}_${message.author.id}`, 1);
                    let embed = new Discord.MessageEmbed()
                        .setAuthor(`${itemlist[randomItem].name}`)
                        .setDescription(`${itemlist[randomItem].sell - 3000}`)
                        .setThumbnail(bot.emojis.cache.find(emoji => emoji.name === `${randomItem}`).url)
                        .setColor(colour)
                    message.channel.send(embed);
                    return;
                }
            }
        }
    }
};

module.exports.help = {
    name: "open",
    aliases: ["o"],
    type: "user"
};