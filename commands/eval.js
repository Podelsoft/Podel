const Discord = require("discord.js");
let config = require("../config.json"),
  colour = config.colour;

const clean = text => {
  if (typeof (text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
    return text;
}

module.exports.run = async (bot, message, args) => {

  if (config.owner.includes(message.author.id)) {
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

      let embed = new Discord.MessageEmbed()
        .addField("Input", `\`\`\`${args.join(" ")}\`\`\``)
        .addField("Output", `\`\`\`${clean(evaled)}\`\`\``)
        .setColor(colour);

      message.channel.send(embed);
    } catch (err) {
      let embed = new Discord.MessageEmbed()
        .addField("Input", `\`\`\`${args.join(" ")}\`\`\``)
        .addField("Error", `\`\`\`xl\n${clean(err)}\n\`\`\``)
        .setColor(colour);

      message.channel.send(embed);
    }
  }
}

module.exports.help = {
  name: "eval",
  type: "owner"
}
