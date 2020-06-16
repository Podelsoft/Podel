const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, args, member) => {
  let user = message.mentions.users.first() || message.author;
  const { createCanvas, loadImage } = require("canvas");
  const canvas = Canvas.createCanvas(256, 256);
  const ctx = canvas.getContext("2d");

  const foreground = await Canvas.loadImage(
    "https://cdn.discordapp.com/attachments/453453641249062912/645560181576433665/yep.png"
  );

  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  const { body: buffer } = await snekfetch.get(
    `${user.displayAvatarURL}&width=256&height=256`
  );
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(foreground, 50, 225, 150, 35);

  const attachment = new Discord.Attachment(canvas.toBuffer(), "yep.png");

  message.channel.send("yep", attachment);
};

module.exports.help = {
  name: "yep"
};
