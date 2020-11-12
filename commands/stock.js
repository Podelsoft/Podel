const Discord = require("discord.js");
const json = require("../companies.json");
const db = require("quick.db");
const config = require("../config.json"),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {

    if (args[0] === "sell") {
        let q = args[1];
        let amount = args[2];

        const company = json[q];

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

        if (tot < amount) return message.channel.send(`you don't have enough **${name}** stocks to sell.`);
        db.add(`balance_${message.author.id}`, price);
        db.subtract(`${name}_${message.author.id}`, amount);
        message.channel.send(`sold **${amount}** ${name} stock for £${price}`);
        return;
    } else if (args[0] === "buy") {
        let balance = db.fetch(`balance_${message.author.id}`);

        let q = args[1];
        let amount = args[2];

        const company = json[q];

        if (!amount) amount = 1;
        if (!company) { return message.channel.send("that company does not exist.") }

        let cbuy = db.fetch(`${company.sname}_buy`);

        let total = cbuy * amount;
        let price = `${total}` * 1;
        let name = company.sname;

        if ((amount % 1) !== 0) { return }
        if (amount < 1) { return }
        if (isNaN(amount)) { return }

        if (price > balance) return message.channel.send('you don\'t have enough to buy this, smelly idiot.');
        db.add(`${name}_${message.author.id}`, amount);
        db.set(`balance_${message.author.id}`, balance - price);
        message.channel.send(`added **${amount}** ${name} stock to your stats for £${price}`);
        return;
    }

    let bal = db.fetch(`balance_${message.author.id}`);

    if (bal === null) bal = 0;

    let embed = new Discord.MessageEmbed()
        .setTitle(`Podel Stock Market (you have £${bal})`)
        .setDescription(`List of companies that you can invest in using p!stock <buy/sell> <companyname> <amount>`)
        .setColor(colour)
        .setTimestamp()
        .setFooter('Podel, make sure to check out lines 75-79 on podel.js', bot.user.avatarURL())

    for (var key in json) {

        if (json.hasOwnProperty(key)) {

            let buy = db.fetch(`${json[key].sname}_buy`);
            let sell = db.fetch(`${json[key].sname}_sell`);

            if (!json[key].tier) {
                embed.addField(`${json[key].name} | ${json[key].sname}`, `📥 £${buy} | 📤 £${sell}`);
            }

        }

    }
    message.channel.send(embed);
};

module.exports.help = {
    name: "stock",
    type: "user"
};