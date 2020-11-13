const Discord = require("discord.js");
const json = require("../companies.json");
const db = require("quick.db");
const ms = require("ms");
const config = require("../config.json"),
    colour = config.colour;
const cooldown = 1.8e6;
const stockchange = db.fetch("stocks_time");
const stocktime = ms(cooldown - (Date.now() - stockchange));

module.exports.run = async (bot, message, args) => {

    if (!config.owner.includes(message.author.id)) return

    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }

    if (args[0] === "sell") {
        let q = args[1];
        let amount = args[2];

        const company = json[q.toLowerCase()];

        if (!amount) amount = 1;
        if (!company) { return message.channel.send("that company does not exist.") }

        let csell = db.fetch(`${company.sname}_sell`);

        let total = csell * amount;
        let price = `${total}` * 1;
        let name = company.sname;
        let tot = db.fetch(`${name}_${message.author.id}`);

        if ((amount % 1) != 0) return;
        if (amount < 1) return;
        if (isNaN(amount)) return;

        let rem = db.fetch(`${name}_decrease`);
        let chance = Math.floor(Math.random() * 100) + 1;
        let drop = Math.floor(Math.random() * 1000) + 1;

        if (tot < amount) return message.channel.send(`you don't have enough **${name}** stocks to sell.`);

        if (chance >= 3) {
            db.add(`balance_${message.author.id}`, price - rem);
            db.subtract(`${name}_${message.author.id}`, amount);
            db.add(`${name}_decrease`, amount * getRandomInt(price, price + 100));
            message.channel.send(`sold **${amount}** ${name} stock for £${price}`);
        } else if (chance <= 2) {
            db.add(`balance_${message.author.id}`, price - rem);
            db.subtract(`${name}_${message.author.id}`, amount);
            db.set(`${name}_sell`, price - (price - drop));
            db.add(`${name}_decrease`, amount * getRandomInt(price, price + 100));
            message.channel.send(`Dropped £${drop}! sold **${amount}** ${name} stock for £${price}`);
        }
        return;
    } else if (args[0] === "buy") {
        let balance = db.fetch(`balance_${message.author.id}`);

        let q = args[1];
        let amount = args[2];

        const company = json[q.toLowerCase()];

        if (!amount) amount = 1;
        if (!company) { return message.channel.send("that company does not exist.") }

        let cbuy = db.fetch(`${company.sname}_buy`);

        let total = cbuy * amount;
        let price = `${total}` * 1;
        let name = company.sname;

        if ((amount % 1) !== 0) { return }
        if (amount < 1) { return }
        if (isNaN(amount)) { return }

        let add = db.fetch(`${name}_increase`);

        if (price > balance) return message.channel.send('you don\'t have enough to buy this, smelly idiot.');
        db.add(`${name}_${message.author.id}`, amount);
        db.set(`balance_${message.author.id}`, balance - (price + add));
        db.add(`${name}_increase`, amount * getRandomInt(price, price + 100))
        message.channel.send(`added **${amount}** ${name} stock to your stats for £${price}`);
        return;
    }

    let bal = db.fetch(`balance_${message.author.id}`);

    if (bal === null) bal = 0;

    let embed = new Discord.MessageEmbed()
        .setTitle(`Podel Stock Market | ${stocktime} left (you have £${bal})`)
        .setDescription(`List of companies that you can invest in using p!stock <buy/sell> <companyname> <amount>`)
        .setColor(colour)
        .setTimestamp()
        .setFooter('Podel, make sure to check out lines 75-79 on podel.js', bot.user.avatarURL())

    for (var key in json) {

        if (json.hasOwnProperty(key)) {

            let buy = db.fetch(`${json[key].sname}_buy`);
            let sell = db.fetch(`${json[key].sname}_sell`);
            let inc = db.fetch(`${json[key].sname}_increase`);
            let dec = db.fetch(`${json[key].sname}_decrease`);

            if (!json[key].tier) {
                embed.addField(`${json[key].name} | ${json[key].sname}`, `📥 £${buy + inc} | 📤 £${sell + dec}`);
            }

        }

    }
    message.channel.send(embed);
};

module.exports.help = {
    name: "stock",
    type: "owner"
};