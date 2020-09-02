const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {  
  const snekfetch = require("snekfetch");  
  const Canvas = require("canvas");
  const { createCanvas, loadImage } = require('canvas');
  const canvas = Canvas.createCanvas(360, 203);
  const ctx = canvas.getContext('2d');

  let user = message.mentions.users.first() || message.author;

  const { body: buffer } = await snekfetch.get(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
	const avatar = await Canvas.loadImage(buffer);
	 ctx.drawImage(avatar, 242, 60, 42, 42);
	const background = await Canvas.loadImage("https://cdn.glitch.com/097ac981-3bb6-42e1-b9b6-9c51c42e22ae%2Fxz.png?v=1592431786456");
	ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
  await message.channel.send({ files: [canvas.toBuffer()] });
}

module.exports.help = {
   name: "car"
}
