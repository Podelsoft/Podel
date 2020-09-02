const Discord = require("discord.js");
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {

  let botsonly = message.guild.members.cache.filter(member => member.user.bot).size;
  let usersonly = message.guild.memberCount - botsonly;
  let guild1 = message.guild;  
  let guildowner = message.guild.member(guild1.owner) ? guild1.owner.toString() : guild1.owner.user.tag;

  let region = {
     "brazil": ":flag_br: Brazil",
     "eu-central": ":flag_eu: Central Europe",
     "singapore": ":flag_sg: Singapore",
     "us-central": ":flag_us: U.S. Central",
     "sydney": ":flag_au: Sydney",
     "us-east": ":flag_us: U.S. East",
     "us-south": ":flag_us: U.S. South",
     "us-west": ":flag_us: U.S. West",
     "eu-west": ":flag_eu: Western Europe",
     "vip-us-east": ":flag_us: VIP U.S. East",
     "london": ":flag_gb: London",
     "amsterdam": ":flag_nl: Amsterdam",
     "hongkong": ":flag_hk: Hong Kong",
     "russia": ":flag_ru: Russia",
     "southafrica": ":flag_za: South Africa",
     "europe": ":flag_eu: Europe"
  };  
 
    let sicon = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}?size=128`;
    if (message.guild.features.includes("ANIMATED_ICON"))
      sicon = `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.gif?size=128`;
    let serverembed = new Discord.MessageEmbed()
    .setTitle(`${message.author.tag} | Server Info`)
    .setColor(colour)
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name, true)
    .addField("Server ID", message.guild.id, true)
    .addField("Server Owner", guildowner, true)
    .addField("Server Owner ID", message.guild.owner.id, true)
    .addField("Server Region", region[message.guild.region], true)
    .addField('\u200b', '\u200b')
    .addField("Users", usersonly, true)
    .addField("Bots", botsonly, true)
    .addField('\u200b', '\u200b')
    .addField("Created On", message.guild.createdAt)
    .addField("Join Date", message.member.joinedAt)
    .setTimestamp()
    .setFooter("Podel, what continent am I in", bot.user.displayAvatarURL());

    message.channel.send(serverembed);
}

module.exports.help = {
  name: "server",
  aliases: ['s', 'sinfo']
}
