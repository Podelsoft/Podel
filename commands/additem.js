const fs = require('fs');
const json = require('../items.json');

module.exports.run = async (bot, message, args) => {

 if (message.member.hasPermission("BAN_MEMBERS")) {

  let j = args.join(' ');

  let a = j.substring(0, j.indexOf("|"));
  let b = j.split("|")[1];
  let c = j.split("|")[2];
  let d = j.split("|")[3];
  let e = j.split("|")[4];
  let f = j.split("|")[5];

//console.log(`obj: ${a.trim()} name: ${b.trim()} | db: ${c.trim()} | emoji: ${d.trim()} | buy: ${e.trim()} | sell: ${f.trim()}`);

  json[a.trim()] = {
     name: b.trim(),
     db: c.trim(),
     emoji: d.trim(),
     buy: e.trim(),
     sell: f.trim()
  };

  fs.writeFile("../items.json", JSON.stringify(json), err => {
    if (err) console.log(err);
  });  

  message.channel.send(`item successfully added.`);

 }
  
}

module.exports.help = {
  name: "additem"
}
