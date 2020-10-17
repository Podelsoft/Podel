const json = require('../items.json');
const db = require('quick.db');

module.exports.run = async (bot, message, args) => {

  for (var key in json) {

    if (json.hasOwnProperty(key)) {

      let item = db.fetch(`${args[0]}_${message.author.id}`);

      if (item >= 1 && json[key].db === args[0]) {
        await db.delete(`car_${message.author.id}`);
        await db.push(`car_${message.author.id}`, args[0]);

        let perc = 0;

        if (json[args[0]].grade >= 10) { perc = 10 }
        if (json[args[0]].grade >= 20) { perc = 20 }
        if (json[args[0]].grade >= 30) { perc = 30 }
        if (json[args[0]].grade >= 40) { perc = 40 }
        if (json[args[0]].grade >= 50) { perc = 50 }
        if (json[args[0]].grade >= 60) { perc = 60 }
        if (json[args[0]].grade >= 70) { perc = 70 }
        if (json[args[0]].grade >= 80) { perc = 80 }
        if (json[args[0]].grade >= 90) { perc = 90 }
        if (json[args[0]].grade >= 100) { perc = 100 }

        await db.delete(`perc_${message.author.id}`);
        await db.push(`perc_${message.author.id}`, `${perc}`);

        await message.channel.send(`successfully set **${json[key].name}** as your main car.`);
      }

    }
  }

}

module.exports.help = {
  name: "setcar",
  type: "user"
}
