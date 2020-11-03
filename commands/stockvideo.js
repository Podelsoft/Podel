const { createClient } = require("pexels");
const config = require("../../secret.json");

const client = createClient(config.pexapi);

module.exports.run = async (bot, message, args) => {
    if (!args.join(" ")) return message.channel.send("you must type something in.");
    const query = args.join(" ");

    client.videos.search({ query, per_page: 1 }).then(videos => {
        let result = videos.videos[0].video_files[0].link;
        message.channel.send(`${result}`)
    }).catch(err => {
        message.channel.send(`searched for **${args.join(" ")}** but found nothing. (${err})`)
    });
};

module.exports.help = {
    name: "stockvideo",
    aliases: ["sv"],
    type: "user"
}