const superagent = require("superagent");
const fs = require("fs");
const { MessageAttachment } = require("discord.js");

module.exports.run = async (bot, message, args) => {
    let koke = [
        "noob",
        "ok",
        "p!koke",
        "NO WAY",
        "best care",
        "nn m'n m'n m'n m'n n. ؟و ووووو. و و و و.",
        "someone vandalized a train here with what he said",
        "axel",
        "fuck ofd",
        "ye",
        "i got a shit haircut now",
        "no",
        "i woke up",
        "virryn",
        "holy fuck",
        "you have no hair and no job LOL",
        "im",
        "d",
        "discord",
        "i wanna choke myself",
        "would actually have sex with a femboy if i had no other choice",
        "pog",
        "have to sit here for another 2 hours yay",
        "o)àli$",
        "fuck off",
        "k",
        "WAIT",
        "IS IT LEGAL TO POST 7 DAYS FREE?",
        "time to get level 50 on this server",
        "give mod",
        "jixaw",
        "LOL",
        "I AM KOKE",
        "is this the official podel server",
        "i am a gamer",
        "x",
        "he saw a bird an when crazy",
        ":uwu: :uwu: :uwu:",
        "toilet in real life",
        "WTF TOILET IN REAL LIFE ???",
        "14",
        "i care more about hong kong than america tbh",
        "p!xp",
        "asap rocky testing",
        "world of warcraft cataclysm",
        "can i please have",
        "wtf",
        "imagine being so obsessed with race",
        "being american",
        "you're just shit",
        ":pussyassbitch: :pussyassbitch: :pussyassbitch:",
        "yay",
        ":koke:",
        "xhat",
        "0",
        "funny",
        "rtyrlooph,tre",
        "3",
        "brandon",
        "1",
        ":kojima1:",
        "6",
        "function trim() { [native code] }",
        "what",
        "hi let",
        "leyton",
        "8",
        "h",
        "g",
        "where is your shop",
        "i need groceries",
        "ok thakns you",
        "booking my boat now",
        ":kojima1::kojima2::kojima3:",
        "????????????????????????????????????????????????????????",
        "please dont say we cant say that shit again",
        "my dad",
        "im gonna shit my own cum",
        "stop gaming",
        "windows 53.3",
        "Volkswagen Passat GTE fails the moose test",
        "eat my",
        "b",
        "unpaid actors",
        "very real",
        "can i legally say the n word",
        "yup",
        "we on",
        "SHUT UP",
        "ban nitro pls",
        "so bad just fuck off",
        "willoff",
        "yo uare",
        "FDUCK OFF",
        "nirtor",
        "bruh",
        "can chris spell",
        ":zany_face: :zany_face: :zany_face: :zany_face: :zany_face: :zany_face: :zany_face: :zany_face: :zany_face: :zany_face:",
        "zany face",
        "man types for 2 years",
        "its really good",
        "FUC K",
        "im having se",
        "you're fit",
        "HE HAS MORE VIDS THAN SUBS IM CRYING",
        "m.inc",
        "what is happenoing in vc helkp",
        "china",
        "the guy has 27k videos",
        "5",
        ":/",
        "STFU",
        "33",
        "can i be banned forever",
        ":cry:",
        "please",
        "????",
        "wha"
    ];

    let result = Math.floor(Math.random() * koke.length);
    function wrap(str, maxWidth) {
        var newLineStr = "|"; done = false; res = '';
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

    let text = wrap(`${koke[result]}`, 100);

    text = text.replace(/(?:\r\n|\r|\n)/g, '|');
    text = text.replace(/\s/g, " "),
    text = text.split(`"`).join(`\\"`),
    text = encodeURI(text);

    let cmd = `curl --data 'request={"target": "Delay", "content": "${text.split(`'`).join(`%27`)}"}'  memefactory.realitaetsverlust.rocks --output kodelay.jpg`

    var exec = require("child_process").exec;
    exec(cmd, function () {
        const attachment = new MessageAttachment("./kodelay.jpg");
        message.channel.send(attachment).then(() => {
            fs.unlinkSync("./kodelay.jpg");
        });
    });
};

module.exports.help = {
    name: "kodelay",
    aliases: ["kl"],
    type: "user"
};