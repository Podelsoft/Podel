const Canvas = require("canvas");

module.exports.run = async(bot, message, args, member) => {
    let user = message.mentions.users.first() || message.author;
    const canvas = Canvas.createCanvas(934, 600);
    const ctx = canvas.getContext("2d");

    const foreground = await Canvas.loadImage(
        "https://media.discordapp.net/attachments/622424015356559363/773956798959976538/empire.png"
    );

    const avatar = await Canvas.loadImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
    ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(foreground, 0, 0, canvas.width, canvas.height);

    message.channel.send("", { files: [canvas.toBuffer()] });
}

module.exports.help = {
    name: "empire",
    type: "user"
}