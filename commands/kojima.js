const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, args, member) => {
  let user = message.mentions.users.first() || message.author;
  const { createCanvas, loadImage } = require("canvas");
  const canvas = Canvas.createCanvas(1570, 2048);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://img.pngio.com/shitpostbot-5000-hideo-kojima-png-1570_2048.png"
  );
  
  let kojimoji = bot.emojis.cache.find(emoji => emoji.name === `kojima`);

  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  const { body: buffer } = await snekfetch.get(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
  const avatar = await Canvas.loadImage(buffer);
  ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  message.channel.send(kojimoji, { files: [canvas.toBuffer()] });
};

module.exports.help = {
  name: "kojima"
};
