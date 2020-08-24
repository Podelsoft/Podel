const Discord = require("discord.js");
const ytdl = require("ytdl-core");
let config = require('../config.json'),
    colour = config.colour;

module.exports.run = async (bot, message, args) => {
  let podelemoji = bot.emojis.find(emoji => emoji.name === `podel`);

  let j = args.join(" ");
  let a = j.split("v:")[1];
  if (!j) a = 1;
  if (isNaN(j)) a = 1;

  let list = [
   "306104099185623042", 
   "455539069565534210",
   "497116566845128724",
   "140175075314892800",
   "298055278711144449",
   "270151402607607808",
   "175347895380213760",
   "568129312876789776",
   "90425297995837440",
   "156355094034513920",
   "604189156490346496"
  ]

  if (!list.includes(message.author.id)) return;

  if (message.member.voiceChannel) {

   let track = await bot.player.play(message.member.voiceChannel, args.join(' '), message.member.user.tag);

        let embed = new Discord.RichEmbed()
          .setTitle(
            message.member.voiceChannel.name + " | " + message.author.tag
          )
          .addField(`Now Playing ${podelemoji}:`, `${track.name}`)
          .addField(`Duration`, `${track.duration}`)
          .addField(
            "Listen to this track here:",
            `[Open Youtube](${track.url})`,
            true
          )
          .setThumbnail(track.thumbnail)
          .setColor(colour)
          .setTimestamp()
          .setFooter(
            "Podel, coded by the government of georgia",
            bot.user.displayAvatarURL
          );
        
        await message.channel.send(embed);
  } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "play"
}
