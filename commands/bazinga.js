const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, args) => {
  let user = message.mentions.users.first() || message.author;
  const { createCanvas, loadImage } = require("canvas");
  const canvas = Canvas.createCanvas(256, 256); // how do i compile
  const ctx = canvas.getContext("2d"); // how do I receive sex

  const background = await Canvas.loadImage(
    "https://media.discordapp.net/attachments/644551231020204065/645044407736729600/656.png?width=256&height=256"
  );

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.beginPath();
  ctx.arc(125, 160, 20, 0, Math.PI * 2, true);
  ctx.closePath();
  ctx.clip();

  const avatar = await Canvas.loadImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
  ctx.drawImage(avatar, 100, 135, 50, 50);

  message.channel.send(":flag_bg:", { files: [canvas.toBuffer()] });

};

module.exports.help = {
  name: "bazinga"
};
