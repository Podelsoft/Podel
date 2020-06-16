const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, args, member) => {

  let user = message.mentions.users.first() || message.author;
  const { createCanvas, loadImage } = require("canvas");
  const canvas = Canvas.createCanvas(353, 143);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.glitch.com/5d94d2b3-55ae-4001-86e0-104c8c5e4005%2Ftheglobalelite.png?v=1588384940010"
  );
  const { body: buffer } = await snekfetch.get(user.displayAvatarURL);
  const avatar = await Canvas.loadImage(buffer);
  await ctx.drawImage(avatar, 120, 15, 115, 115);
  await ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const attachment = new Discord.Attachment(canvas.toBuffer(), "global.png");
  message.channel.send(user.username + " is the worlds most global man", attachment);
};

module.exports.help = {
  name: "global"
}