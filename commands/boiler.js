const Canvas = require("canvas");

module.exports.run = async (bot, message, args, member) => {

  let user = message.mentions.users.first() || message.author;
  const canvas = Canvas.createCanvas(550, 657);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://cdn.glitch.com/2de261db-5b70-494d-ae55-8a48514c9aa7%2Fboilerts.png?v=1586399768483"
  );
  const avatar = await Canvas.loadImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
  await ctx.drawImage(avatar, 183, 207, 80, 230);
  await ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  message.channel.send(user.username + " boiling", { files: [canvas.toBuffer()] });
};

module.exports.help = {
  name: "boiler"
}