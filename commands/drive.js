const db = require("quick.db"),
    ms = require("parse-ms");
const json = require("../items.json");

module.exports.run = async (bot, message, args, tools) => {
    let lastdrive = await db.fetch(`dailydrive_${message.author.id}`);

    let cooldown = 3600000;

    let c = cooldown - (Date.now() - lastdrive);

    if (lastdrive !== null && c > 0) {
        let timeObj = ms(c);

        return message.reply(`you've already driven in podel city mate, please wait ${timeObj.hours}h ${timeObj.minutes}m until your next refuel`);
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

        let mbmsg = "";

        if (mb) {
            db.subtract(`marlboro_${message.author.id}`, 1);
            mbmsg = " (doubled multiplier, smiked a pack of marlboro 20s)";
            mult = mult * 2;
        }

        let list = [
            "you drove around podel city and found a fair amount of bills",
            "you made a funny while driving and people started throwing pennies at you, you collected them",
            "you drove over 15 people, you'd get a 10 second sentence but your mate bailed you out and gave you money to eat or something",
            "you had a proper rumble with some chav on your way to tesco and someone betted that you'd lose but you won",
            "you quickscoped some man and stole his wallet while cruising podel city",
            "your car ran out of fuel halfway to the bar you'd go to so you went hitchhiking and some woman was kind enough to give you money to pay for your crap fuel",
            "you just drove by the podel post office to mail a tax return request and drove back home",
            "you just got your yearly payment for working at the nail factory in bangladesh back in like 1993 from the podel post office or something",
            "you have just finished hunting for pennies in podel city, made like 50p but some rich bloke gave you money and shelter for the day",
            "you crashed at your local morrisons, drove inside, fell off a cliff at the back of the store and survived but your insurance covered everything"
        ]

        let prize = Math.floor(res * (10 * Math.random() + 1) * mult);

        message.channel.send(`${list[res-1]}${mbmsg}, £${prize} have been added to your stats cheers`);
        db.set(`dailydrive_${message.author.id}`, Date.now());
        await db.add(`balance_${message.author.id}`, prize);
    }
};

module.exports.help = {
    name: "drive",
    aliases: ["dv"],
    type: "user"
};
