const json = require('../items.json');
const db = require('quick.db');

module.exports.run = async(bot, message, args) => {

for (var key in json) {

  if (json.hasOwnProperty(key)) {
   
   let item = db.fetch(`${args[0]}_${message.author.id}`);  
 
   if (item >= 1 && json[key].db === args[0]) { 
    await db.delete(`car_${message.author.id}`);
    await db.push(`car_${message.author.id}`, args[0]);
    message.channel.send(`successfully set **${json[key].name}** as your main car.`);
   }

  }
 }

}

module.exports.help = {
  name: "setcar"
}
