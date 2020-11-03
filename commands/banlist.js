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
            if (config.autoBan.includes[args[1]]) {
                delete config.autoBan[args[1]];
                message.channel.send(`remove **${args[1]}** from the banlist.`);
            } else {
                message.channel.send("that user ID isn't on the banlist.");
            }
        } else if (args[0] === "list") { 
            message.channel.send(config.autoBan);
        }
    }
};

module.exports.help = {
    name: "banlist",
    aliases: ["bl"],
    type: "mod"
};