const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {
  let j = args.join(" ");
  let q = j.substring(0, j.indexOf("|"));
  let a = j.split("|")[1];
  const fs = require("fs");
  const path = `./chat/${q.trim().toLowerCase()}.js`;
  try {
    if (!fs.existsSync(path)) {
      fs.writeFile(
        `./chat/${q.trim().toLowerCase()}.js`,
        `
\n${a}
`,
        function(err) {
          if (err) throw err;
          console.log(`ML | Q: ${q.trim()} & A: ${a.trim()} `);
          message.channel.send(`added answer ${a.trim()} | for: ${q.trim()}`);
        }
      );
    } else {
      fs.appendFile(path, `\n${a}`, function(err) {
        if (err) {
          message.channel.send("`ERROR:` " + "```" + err + "```");
          console.error(err);
        } else {
          console.log(`ML | Q: ${q.trim()} & A: ${a.trim()} `);
          message.channel.send(`added answer ${a.trim()} | for: ${q.trim()}`);
        }
      });
    }
  } catch (err) {
    message.channel.send("`ERROR:` " + "```" + err + "```");
    console.error(err);
  }
};

module.exports.help = {
  name: "ans",
  aliases: ['answer', 'add']
}