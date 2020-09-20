const Canvas = require("canvas");

module.exports.run = async (bot, message, args) => {

  let user = message.mentions.users.first() || message.author;
  const canvas = Canvas.createCanvas(353, 143);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.glitch.com/5d94d2b3-55ae-4001-86e0-104c8c5e4005%2Ftheglobalelite.png?v=1588384940010"
  );
  const avatar = await Canvas.loadImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
  await ctx.drawImage(avatar, 120, 15, 115, 115);
  await ctx.drawImage(background, 0, 0, canvas.width, canvas.height);


  message.channel.send(user.username + " is the worlds most global man", { files: [canvas.toBuffer()] });
};

module.exports.help = {
  name: "global",
  type: "user"
}