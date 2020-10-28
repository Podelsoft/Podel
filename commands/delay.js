const superagent = require("superagent");

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

    let text = wrap(`${args.join(" ")}`, 120);
    
    text = text.replace(/ /g, "%20");
    text = text.replace(/\s/g, '|');

    message.channel.send(`http://delaygen.realitaetsverlust.rocks/${text}`);
};

module.exports.help = {
    name: "delay",
    type: "user"
}