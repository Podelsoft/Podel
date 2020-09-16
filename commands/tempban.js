const Discord = require("discord.js");
const config = require("../config.json"),
  colour = config.colour;
const db = require("quick.db");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
  
  let bantime = args[1];
  
  let j = args.join(' ');
  let reason = j.split(args[1])[1];  
 
  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission("BAN_MEMBERS")) {
    if (!bantime) return;
    if (!reason) return message.channel.send('you must provide a valid reason.')
    let user = bot.users.cache.find(user => user.username.toLowerCase().includes(args[0].toLowerCase())) || message.mentions.users.first() || bot.users.cache.find(user => user.id === args[0]);
    if (user) {
     const member = message.guild.member(user);
      if (member) {
        message.channel.send(`Are you sure you want to ban **${user.tag}** for **${bantime}** (yes/no)`);
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        console.log(collector)
        collector.on('collect', async message => {
            if (message.content == "yes") {
              await db.add(`banCount_${user.id}`, 1);
                member.ban({ reason: "eliminated by podelbot for " + bantime })
                .then(async () => {
                  await user.send(`you've been banned from Podel Server for **${bantime}** (Reason:${reason})`)
                  await message.reply(
                    `Successfully banned ${user.tag} for ${bantime} (Reason:${reason})`
                  );
                  await db.add(`banCount_${user.id}`, 1);
                 // await db.set(`bantime_${message.author.id}`, ms(bantime));
                  if (isNaN(bantime)) return message.channel.send("for how long?? (like p!tempban @user 1s idk)");
                  if (bantime < 0) return message.channel.send("how is this man.");
        
        let embed = new Discord.MessageEmbed()
          .setTitle(`${user.tag} | Tempban`)
          .addField("Time", bantime)
          .addField("Mod/Admin", message.author.tag)
          .addField("Reason", reason)
          .setThumbnail(user.displayAvatarURL())
          .setColor(colour)
          .setTimestamp()
          .setFooter(
            "Podel, coded by the government of georgia",
            bot.user.avatarURL()
          );

        await bot.guilds.cache
          .get("696515024746709003")
          .channels.cache.get("704356972606259220")
          .send(embed);

        setTimeout(function() {
          let embed2 = new Discord.MessageEmbed()
            .setTitle(`${user.tag} | Unban`)
            .addField("Time", bantime)
            .addField("Mod/Admin", message.author.tag)
            .addField("Reason", reason)
            .setThumbnail(user.displayAvatarURL())
            .setColor("#9e0e24")
            .setTimestamp()
            .setFooter(
              "Podel, coded by the government of georgia",
              bot.user.avatarURL()
            );
          message.guild.unban(user, {
            reason: "was tempbanned for " + bantime
          });
          bot.guilds.cache
            .get("696515024746709003")
            .channels.cache.get("704356972606259220")
            .send(embed2);
        }, ms(bantime));
      })
      .catch(err => {
        console.error(err);
      });
            }
            else if (message.content == "no") {
                message.channel.send("cancelled.");
                return;
            }
        });
      } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      message.reply("You didn't mention the user to ban!");
    }
  }
};

module.exports.help = {
  name: "tempban"
}
