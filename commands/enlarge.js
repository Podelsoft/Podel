module.exports.run = async (bot, message, args) => {
    if (!args[0]) return message.channel.send(`you need to input a valid emoji name.`);
    let e = args[0];
    let emojiname = e.split(":")[1].replace("<", "");
    let emoji = bot.emojis.cache.find(e => e.name === emojiname.trim());
    if (!emoji) return message.channel.send(`you need to input a valid emoji name.`);
    message.channel.send(emoji.url);
};

module.exports.help = {
    name: "enlarge",
    aliases: ["e", "en"],
    type: "user"
};