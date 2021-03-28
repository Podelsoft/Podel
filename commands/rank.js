const superagent = require("superagent");
const db = require("quick.db"),
  ms = require("parse-ms");
const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const canvas = Canvas.createCanvas(1080, 1350);
const ctx = canvas.getContext("2d");
const { registerFont } = require("canvas");
registerFont('./discheavy.otf', { family: 'Uni Sans Heavy' });


module.exports.run = async (bot, message, args) => {

  let cooldown = 10000;

  let lastcall = await db.fetch(`rankcmd_${message.author.id}`);

  if (lastcall !== null && cooldown - (Date.now() - lastcall) > 0) {
    let timeObj = ms(cooldown - (Date.now() - lastcall));

    message.reply(`wait **${timeObj.seconds}** sec \`(cooldown)\``);

  } else {

    let { body } = await superagent.get("https://api.cristpz.eu/v1/podel");

    let user = bot.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) || message.mentions.users.first();

    if (!user) user = message.author;
    if (user.id === bot.user.id) user = message.author;

    let curxp = db.fetch(`${user.id}_xp`);
    let curlvl = db.fetch(`${user.id}_level`);

    let nxtlvl =
      5 * (curlvl ** 2) +
      50 * curlvl +
      100;

    const background = await Canvas.loadImage("https://media.discordapp.net/attachments/622424015356559363/779659045845467146/bglvl2.png?width=1080&height=1350");

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    const avatar = await Canvas.loadImage(user.avatarURL({ format: 'png', dynamic: true, size: 1024 }));

    ctx.fillStyle = "white";
    ctx.drawImage(avatar, 90, 320, 300, 300);
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Level
    ctx.font = '128px Uni Sans Heavy';
    ctx.fillStyle = '#000000';
    ctx.fillText(curlvl, 760, 550);

    ctx.fillStyle = '#ffffff';
    ctx.fillText("LVL", 540, 550);

    // XP
    ctx.font = '64px Uni Sans Heavy';
    ctx.fillStyle = '#000000';
    ctx.fillText(curxp + "/" + nxtlvl, 560, 430);

    // Quote
    ctx.font = '56px Uni Sans Heavy';
    ctx.fillStyle = '#000000';
    ctx.fillText(body.msg, 80, 820);

    // Message
    const attachment = new MessageAttachment(canvas.toBuffer());
    message.channel.send(attachment);

    db.set(`rankcmd_${message.author.id}`, Date.now());
  }

}

module.exports.help = {
  name: "rank",
  aliases: ["xp"],
  type: "user"
}
