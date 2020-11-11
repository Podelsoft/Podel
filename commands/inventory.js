const Discord = require("discord.js");
const db = require("quick.db");
let config = require("../config.json"),
    colour = config.colour;
const json = require("../items.json");

module.exports.run = async (bot, message, args) => {
    let user = bot.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) || message.mentions.users.first();

    if (!user) user = message.author;
    if (user.id === bot.user.id) user = message.author;

    let inv = [];

    for (var key in json) {

        if (json.hasOwnProperty(key)) {

            let emoji = bot.emojis.cache.find(emoji => emoji.name === `${json[key].emoji}`);
            let item = db.fetch(`${json[key].db}_${user.id}`);

            if (item >= 1) {
                inv.push(`\n[ ${json[key].name} ${emoji} **x${item}** ]`);
            }

        }
    }

    let res = inv.join("");

    if (res.length < 1) res = "`got mugged 10 minutes ago`"

    const embed = new Discord.MessageEmbed()
        .setTitle(user.tag + " | Inventory")
        .setDescription(res)
        .setColor(colour)
        .setThumbnail(user.avatarURL())
        .setFooter("Podel, old school runescape looks kinda cool doe", bot.user.avatarURL());

    await message.channel.send(embed);
};

module.exports.help = {
    name: "inventory",
    aliases: ["inv", "items"],
    type: "user"
};