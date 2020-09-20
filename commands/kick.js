const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;
  
  if (message.member.hasPermission("KICK_MEMBERS")) {
    const user = bot.users.cache.find(user => user.username.toLowerCase().includes(args.join(' ').toLowerCase())) ||  message.mentions.users.first() || bot.users.cache.find(user => user.id === args.join(' '));
    if (user) {
      if (user.id === bot.user.id) return;
      const member = message.guild.member(user);
      if (member) {
        message.channel.send(`Are you sure you want to kick **${user.tag}** (yes/no)`);
        const collector = new Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 10000 });
        collector.on('collect', message => {
            if (message.content == "yes") {
                member.kick({ reason: "eliminated by podelbot" })
                .then(async () => {
                  let reason = args.join(" ").slice(args[0]);
                  let embed = new Discord.MessageEmbed()
                    .setTitle(`${user.tag} | Kick`)
                    .addField("Reason", reason, true)
                    .addField("Mod/Admin", message.author.tag, true)
                    .setThumbnail(user.displayAvatarURL()())
                    .setColor(colour)
                    .setTimestamp()
                    .setFooter("Podel, :titalaughing:", bot.user.avatarURL());
                await message.reply(`Successfully kicked ${user.tag}`);
                await db.add(`kickCount_${user.id}`, 1);
                await bot.guilds.get(696515024746709003).channels.get(704356972606259220).send(embed);
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
     }
    } else {
        message.reply("That user isn't in this guild!");
      }
    } else {
      return;
    }
  }

module.exports.help = {
  name: "kick"
}

