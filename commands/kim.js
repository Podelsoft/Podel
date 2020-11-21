module.exports.run = async (bot, message, args) => {

    let user = message.mentions.users.first() || message.author;

    const Canvas = require("canvas");
    const canvas = Canvas.createCanvas(783, 501);
    const ctx = canvas.getContext("2d");

    const background = await Canvas.loadImage("https://media.discordapp.net/attachments/622424015356559363/779667661726548009/kim.png?width=783&height=501");

    const avatar = await Canvas.loadImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));

    ctx.drawImage(avatar, 510, 100, 370, 400);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    message.channel.send("", { files: [canvas.toBuffer()] })
};

module.exports.help = {
    name: "kim",
    type: "user"
};