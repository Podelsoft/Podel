const db = require("quick.db");

module.exports.run = async (bot, message, args) => {
  if (!args[0]) {
    message.channel.send("**Options List:** \n```lvlupmsgs (on/off)```");
  }
  if (args[0] === "lvlupmsgs") {
    if (args[1] === "on") {
      db.delete(`lvmsgs_${message.author.id}`);
      db.push(`lvmsgs_${message.author.id}`, `on`);
      await message.channel.send("`lvlupmsgs` set to **on**");
    } else if (args[1] === "off") {
      db.delete(`lvmsgs_${message.author.id}`);
      db.push(`lvmsgs_${message.author.id}`, `off`);
      await message.channel.send("`lvlupmsgs` set to **off**");
    }
  }
};

module.exports.help = {
  name: "opts",
  aliases: ['options'],
  type: "user"
}