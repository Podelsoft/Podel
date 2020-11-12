const fs = require("fs");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
    if (message.guild.id !== config.guildID) { return }

    if (message.member.hasPermission("BAN_MEMBERS")) {
        if (!args[0]) return message.channel.send("available options: `add`, `remove`, `list`");
        if (args[0] === "add") {
            if (!config.autoBan.includes[args[1]]) {
                config.autoBan.push(args[1]);
                fs.writeFile("./config.json", JSON.stringify(config), err => {
                    if (err) throw err;
                });
                message.channel.send(`added **${args[1]}** to the banlist.`);
            } else {
                message.channel.send("that user ID is already on the banlist.");
            }
        } else if (args[0] === "remove") {
            let res = [];
            let i = 0;
            for (i in config.autoBan) {
                if (config.autoBan[i] === args[1]) {
                    delete config.autoBan[i];
                    fs.writeFile("./config.json", JSON.stringify(config), err => {
                        if (err) throw err;
                    });
                    res.push(`removed **${args[1]}** from the banlist.`);
                }
            }
            if (!res.join("")) return message.channel.send("that user ID is not on the banlist.");
            else message.channel.send(res.join(""))
        } else if (args[0] === "list") {
            let i = 0;
            for (i in config.autoBan) {
                let user = await bot.users.fetch(config.autoBan[i]);
                if (user) message.channel.send(`${user.id} | ${user.username}#${user.discriminator}`);
                else message.channel.send(`${config.autoBan[i]} | no info found`);
            }
        }
    }
};

module.exports.help = {
    name: "banlist",
    aliases: ["bl"],
    type: "mod"
};