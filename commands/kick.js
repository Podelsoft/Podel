const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;
  let j = args.join(" ");
  let reason = j.split(args[0])[1];

  if (message.member.hasPermission("KICK_MEMBERS")) {
    if (!reason) { return message.channel.send("you must provide a valid reason.") };
    let user = bot.users.cache.find((user) => user.username.toLowerCase().includes(args[0].toLowerCase())) || message.mentions.users.first() || bot.users.cache.find((user) => user.id === args[0]);
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
                  await user.send(`you've been kicked from Podel Server (Reason:${reason})`)
                  .catch(async () => {
                    message.channel.send('couldn\'t send message to user').then(msg => msg.delete({timeout: 5000}));
                  });
                  let embed = new Discord.MessageEmbed()
                    .setTitle(`${user.tag} | Kick`)
                    .addField("Reason", reason, true)
                    .addField("Mod/Admin", message.author.tag, true)
                    .setThumbnail(user.displayAvatarURL())
                    .setColor(colour)
                    .setTimestamp()
                    .setFooter("Podel, :titalaughing:", bot.user.avatarURL());
                await message.reply(`Successfully kicked ${user.tag}`);
                await db.add(`kickCount_${user.id}`, 1);
                await bot.guilds.cache
                .get("696515024746709003")
                .channels.cache.get("704356972606259220")
                .send(embed);  
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

