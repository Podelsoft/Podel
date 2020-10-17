const Canvas = require("canvas");

module.exports.run = async (bot, message, args, member) => {
  let user = message.mentions.users.first() || message.author;
  const canvas = Canvas.createCanvas(1570, 2048);
  const ctx = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    "https://img.pngio.com/shitpostbot-5000-hideo-kojima-png-1570_2048.png"
  );

  let kojimoji = bot.emojis.cache.find(emoji => emoji.name === `kojima`);

  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  const avatar = await Canvas.loadImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));
  ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  message.channel.send(kojimoji, { files: [canvas.toBuffer()] });
};

module.exports.help = {
  name: "kojima",
  type: "user"
};
