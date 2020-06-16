const Discord = require("discord.js");
const Canvas = require("canvas");
const snekfetch = require("snekfetch");

module.exports.run = async (bot, message, args, member) => {

  let user = message.mentions.users.first() || message.author;
  const { createCanvas, loadImage } = require("canvas");
  const canvas = Canvas.createCanvas(634, 420);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.glitch.com/2de261db-5b70-494d-ae55-8a48514c9aa7%2Fbrickts.png?v=1587691374174"
  );
  const { body: buffer } = await snekfetch.get(user.displayAvatarURL);
  const avatar = await Canvas.loadImage(buffer);
  await ctx.drawImage(avatar, 318, 60, 80, 200);
  await ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  const attachment = new Discord.Attachment(canvas.toBuffer(), "brick.png");
  message.channel.send("throw a brick at me tonight", attachment);
};

module.exports.help = {
  name: "brick"
}