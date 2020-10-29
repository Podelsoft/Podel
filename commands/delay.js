const { MessageAttachment } = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {
    if (!args.join(" ")) return message.channel.send("you must type something in.");

    function wrap(str, maxWidth) {
        var newLineStr = "|"; done = false; res = '';
        while (str.length > maxWidth) {
            found = false;
            for (i = maxWidth - 1; i >= 0; i--) {
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

    let text = wrap(`${args.join(" ")}`, 100);

    text = text.replace(/ /g, " "),
    text = text.replace(/(?:\r\n|\r|\n)/g, '|');
    text = text.replace(/\s/g, " "),
    text = text.split(`"`).join(`\\"`),
    text = encodeURI(text);

    let cmd = `curl --data 'request={"target": "Delay", "content": "${text.split(`'`).join(`%27`)}"}'  memefactory.realitaetsverlust.rocks --output delay.jpg`

    var exec = require("child_process").exec;
    exec(cmd, function () {
        const attachment = new MessageAttachment("./delay.jpg");
        message.channel.send(attachment).then(() => {
            fs.unlinkSync("./delay.jpg");
        });
    });
};

module.exports.help = {
    name: "delay",
    type: "user"
};