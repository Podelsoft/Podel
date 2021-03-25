const db = require("quick.db"),
    ms = require("parse-ms");
const json = require("../items.json");

module.exports.run = async (bot, message, args, tools) => {
    let lastdrive = await db.fetch(`dailydrive_${message.author.id}`);

    let cooldown = 3600000;

    let c = cooldown - (Date.now() - lastdrive);

    if (lastdrive !== null && c > 0) {
        let timeObj = ms(c);

        return message.reply(`you've already driven in podel city mate, please wait ${timeObj.hours}h ${timeObj.minutes}m until your next refuel.`);
    } else {
        const car = db.fetch(`car_${message.author.id}`);
        const mb = db.fetch(`marlboro_${message.author.id}`);

        if (car === null) return message.channel.send('You haven\'t set your car. If you don\'t have one, buy one from the `p!dealership`.');

        let check = db.fetch(`${car}_${message.author.id}`);

        if (check <= 0) return db.delete(`car_${message.author.id}`),
            message.channel.send('You haven\'t set your car. If you don\'t have one, buy one from the `p!dealership`.');

        let res = Math.floor(Math.random() * 9);
        if (res == 0) res = 1;

        let mult = json[car].multiplier;

        if (mb) {
            db.subtract(`marlboro_${message.author.id}`, 1);
            mult = mult * 2;
        }

        let prize = res * 10 * mult;

        message.channel.send(`£${prize} have been added to your stats cheers.`);
        db.set(`dailydrive_${message.author.id}`, Date.now());
        await db.add(`balance_${message.author.id}`, prize);
    }
};

module.exports.help = {
    name: "drive",
    aliases: ["dv"],
    type: "user"
};
