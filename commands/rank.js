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

    let user = bot.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) || message.mentions.users.first();

    if (!user) user = message.author;
    if (user.id === bot.user.id) user = message.author;

    var xp = require("../xp.json");

    if (!xp[user.id]) {
      xp[user.id] = {
        xp: 0,
        level: 1
      };
    }

    let curxp = xp[user.id].xp;
    let curlvl = xp[user.id].level;
    let nxtlvl = 5 * (xp[user.id].level ** 2) + 50 * xp[user.id].level + 100;

    let file = Object.entries(xp)
      .map(([key, val]) => ({ id: key, ...val }))
      .sort((a, b) => b.xp - a.xp);
    n1 = 0,
      n2 = 200000,
      n3 = 1;
    let result = file.slice(n1, n2);
    let data = JSON.stringify(result);

    data = data.replace(/[^0-9,]/g, '');
    data = data.split(',');

    let place = n3;
    let placeNumber;

    for (var i = 0; i < data.length; i = i + 3) {
      if (!bot.users.cache.get(data[i])) { placeNumber = ""; break; }
      if (bot.users.cache.get(data[i]).id === user.id) { placeNumber = String(place); break; } else {
        // TODO: get a job  
      };
      place++;
    }

    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/622424015356559363/768846684452814878/bglvl.png");

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

    // Place
    ctx.font = '60px Uni Sans Heavy';
    ctx.fillStyle = '#363636';
    if (placeNumber.length === 3) {
      ctx.fillText("#" + placeNumber, 255, 600);
    } else if (placeNumber.length === 2) {
      ctx.fillText("#" + placeNumber, 285, 600);
    } else if (placeNumber.length === 1) {
      ctx.fillText("#" + placeNumber, 305, 600);
    } else if (placeNumber.length < 1) {
      ctx.fillText("", 315, 600)
    }

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
