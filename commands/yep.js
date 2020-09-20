const Canvas = require("canvas");

module.exports.run = async (bot, message, args, member) => {
  let user = message.mentions.users.first() || message.author;
  const canvas = Canvas.createCanvas(256, 256);
  const ctx = canvas.getContext("2d");

  const foreground = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/453453641249062912/645560181576433665/yep.png"
  );

  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
  ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(foreground, 50, 225, 150, 35);

  message.channel.send("yep", { files: [canvas.toBuffer()] });
};

module.exports.help = {
  name: "yep",
  type: "user"
};
