
const { MessageAttachment } = require("discord.js");
const Canvas = require("canvas");
const canvas = Canvas.createCanvas(633, 475);
const ctx = canvas.getContext("2d");

module.exports.run = async (bot, message, args) => {
    if (!args.join(" ")) return message.channel.send("you must type something in.");
    if (args.join(" ").length > 125) return message.channel.send(`too many characters \`(${args.join(" ").length}/125)\``);

    function wrap(str, maxWidth) {
        var newLineStr = "\n"; done = false; res = '';
        while (str.length > maxWidth) {
            found = false;
            for (var i = maxWidth - 1; i >= 0; i--) {
                if (testWhite(str.charAt(i))) {
                    res = res + [str.slice(0, i), newLineStr].join('');
                    str = str.slice(i + 1);
                    found = true;
                    break;
                }
            }
            if (!found) {
                res += [str.slice(0, maxWidth), newLineStr].join('');
                str = str.slice(maxWidth);
            }

        }

        return res + str;
    }

    function testWhite(x) {
        var white = new RegExp(/^\s$/);
        return white.test(x.charAt(0));
    };

    const background = await Canvas.loadImage("https://cdn.discordapp.com/attachments/622424015356559363/771862973463003136/reimu.png");

    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = '#ffffff';
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Text
    let text = wrap(`${args.join(" ")}`, 25);

    ctx.font = '25px Impact';
    ctx.fillStyle = '#000000';
    ctx.fillText(text, 45, 120);

    // Message
    const attachment = new MessageAttachment(canvas.toBuffer());
    message.channel.send(attachment);
};

module.exports.help = {
    name: "reimu",
    type: "user"
}