const Discord = require("discord.js");
const yts = require("yt-search");
let config = require("../config.json"),
  colour = config.colour;

module.exports.run = async (bot, message, args) => {
  let podelemoji = bot.emojis.cache.find(emoji => emoji.name === `podel`);

  if (message.member.voice.channel) {

    let track = await bot.player.addToQueue(message.guild.id, args.join(" "));

    if (!track) {
      await bot.player.addToQueue(message.guild.id, args.join(" "));
    } else {
      yts(args.join(), async (err, r) => {

        let videos = r.videos;

        let embed = new Discord.MessageEmbed()
          .setTitle(
            "#" + message.member.voice.channel.name + " | " + message.author.tag
          )
          .addField(`Now Playing ${podelemoji}:`, `${videos[0].title}`)
          .addField(`Duration`, `${videos[0].timestamp}`)
          .addField(
            "Listen to this track here:",
            `[Open Youtube](${videos[0].url})`,
            true
          )
          .setThumbnail(videos[0].thumbnail)
          .setColor(colour)
          .setTimestamp()
          .setFooter(
            "Podel, coded by the government of georgia",
            bot.user.displayAvatarURL()
          );

        await message.channel.send(embed);
      });
    }
  } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "add",
  type: "user"
}
