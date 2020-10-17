const config = require('../config.json');

module.exports.run = async (bot, message, args) => {
  if (config.owner.includes(message.author.id)) return;
  let j = args.join(" ");
  let name = j.substring(0, j.indexOf("|"));
  let scode = j.split("|")[1];
  const fs = require("fs");
  const path = `./commands/${name.trim().toLowerCase()}.js`;
  try {
    if (!fs.existsSync(path)) {
      fs.writeFile(
        `./commands/${name.trim().toLowerCase()}.js`,
        `
${scode}

module.exports.help = {
  name: "${name.trim().toLowerCase()}"
}
`,
        function (err) {
          if (err) throw err;
          // console.log(`added command ${name.trim()}.js | Code: ${scode.trim()} `);
          message.channel.send(`added command **${name.trim()}.js** | **Code:** \n\`\`\`js
${scode.trim()}\`\`\``);
        }
      );
    } else return;
  } catch (err) {
    message.channel.send("`ERROR:` " + "```" + err + "```");
    // console.error(err);
  }
};

module.exports.help = {
  name: "makecommand",
  aliases: ["mc", "makecmd"],
  type: "owner"
}
