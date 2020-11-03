const { MessageAttachment } = require("discord.js")
const fs = require("fs");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
    if (!config.owner.includes(message.author.id)) return;
    let exec = require("child_process").exec;

    let file1 = `wget -c ${args[0]} -O ${args[2]}`;
    let file2 = `wget -c ${args[1]} -O ${args[3]}`;

    exec(file1);
    exec(file2);

    let ffmpeg = `ffmpeg -framerate 25 -i ${args[2]} -i ${args[3]} -vf "pad=ceil(iw/2)*2:ceil(ih/2)*2" -c:v libx264 -preset veryslow -crf 0 yep.mp4`

    setTimeout(function () {
        exec(ffmpeg, function () {
            const attachment = new MessageAttachment("yep.mp4");
            message.channel.send(attachment).then(() => {
                fs.unlinkSync("./yep.mp4");
                fs.unlinkSync(`./${args[2]}`);
                fs.unlinkSync(`./${args[3]}`);
            }).catch(err => {
                console.log(err);
                fs.unlinkSync(`./${args[2]}`);
                fs.unlinkSync(`./${args[3]}`);
            });
        });
    }, 5000);
};

module.exports.help = {
    name: "test",
    type: "owner"
}