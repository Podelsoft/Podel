const { createClient } = require("pexels");
const config = require("../../secret.json");

const client = createClient(config.pexapi);

module.exports.run = async (bot, message, args) => {
    if (!args.join(" ")) return message.channel.send("you must type something in.");
    const query = args.join(" ");

    client.photos.search({ query, per_page: 1 }).then(photos => {
        let result = photos.photos[0].src;

        message.channel.send(`
{
  "original": "${result.original}",
  "large2x": "${result.large2x}",
  "large": "${result.large}",
  "medium": "${result.medium}",
  "small": "${result.small}",
  "portrait": "${result.portrait}",
  "landscape": "${result.landscape}",
  "tiny": "${result.tiny}"
}`, { code: 'json' }).then(() => { message.channel.send(`${result.original}`) });
    }).catch(err => {
        message.channel.send(`searched for **${args.join(" ")}** but found nothing. (${err})`)
    });
};

module.exports.help = {
    name: "stockphoto",
    aliases: ["sp"],
    type: "user"
}