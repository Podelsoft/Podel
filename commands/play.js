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
  ]

  if (!list.includes(message.author.id)) return;

  if (message.member.voiceChannel) {
    // if (args[0] === "yt") {
      if (message.content.includes("youtu")) {
        const connection = await message.member.voiceChannel.join();
        const dispatcher = connection.playStream(
          ytdl(args.join(" "), { filter: "audioonly"})
        );
        const songInfo = await ytdl.getInfo(args.join(" "));
        const song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url
        };

        dispatcher.resume();

        dispatcher.setVolume(a);

        let cut = args.join(" ").slice(32, 43);

        let thumbnail = `https://i.ytimg.com/vi/${cut}/default.jpg`;

        let embed = new Discord.RichEmbed()
          .setTitle(
            message.member.voiceChannel.name + " | " + message.author.tag
          )
          .addField(`Now Playing ${podelemoji}:`, `${song.title}`)
          .addField(
            "Listen to this track here:",
            `[Open Youtube](${song.url})`,
            true
          )
          .setThumbnail(thumbnail)
          .setColor(colour)
          .setTimestamp()
          .setFooter(
            "Podel, coded by the government of georgia",
            bot.user.displayAvatarURL
          );
        
        let embed2 = new Discord.RichEmbed()
        .setTitle('disconnected.')
        .setColor(colour);

        await message.channel.send(embed);

        dispatcher.on("end", () => {
          message.channel.send(embed2);
          message.member.voiceChannel.leave();
        });
      } else if (!message.content.includes("youtube.com")) {
        const yts = require("yt-search");
        yts(args.join(" "), async function(err, r) {
          const videos = r.videos;
          const playlists = r.playlists || r.lists;
          const channels = r.channels || r.accounts;

          const connection = await message.member.voiceChannel.join();
          const dispatcher = connection.playStream(
            ytdl(videos[0].url, { filter: "audioonly"})
          );
          const songInfo = await ytdl.getInfo(videos[0].url);
          const song = {
            title: songInfo.videoDetails.title,
            url: songInfo.videoDetails.video_url
          };

          dispatcher.resume();

          dispatcher.setVolume(a);

          let cut = videos[0].url;

          let thumbnail = r.thumbnail;

          let embed = new Discord.RichEmbed()
            .setTitle(
              message.member.voiceChannel.name + " | " + message.author.tag
            )
            .addField(`Now Playing ${podelemoji}:`, `${song.title}`)
            .addField(
              "Listen to this track here:",
              `[Open Youtube](${song.url})`,
              true
            )
            .setThumbnail(thumbnail)
            .setColor(colour)
            .setTimestamp()
            .setFooter(
              "Podel, coded by the government of georgia",
              bot.user.displayAvatarURL
            );
          
          let embed2 = new Discord.RichEmbed()
          .setTitle('disconnected.')
          .setColor(colour);

          await message.channel.send(embed);

          dispatcher.on("end", () => {
            message.channel.send(embed2);
            message.member.voiceChannel.leave();
          });
        });
      }
     /* else if (args[0] !== "yt") {
      const connection = await message.member.voiceChannel.join();
      const dispatcher = connection.playStream(args.join(" "));
      dispatcher.resume();

      dispatcher.setVolume(0.5);

      dispatcher.on("finish", () => {
        message.channel.send("disconnected.");
        dispatcher.destroy();
        message.member.voiceChannel.leave();
      });

      const embed = new Discord.RichEmbed()
        .setTitle(message.member.voiceChannel.name + " | " + message.author.tag)
        .addField(`Now Playing ${podelemoji}:`, `${args.join(" ")}`)
        .addField(
          "Listen to this track here:",
          `[Open Track](${args.join(" ")})`,
          true
        )
        .setColor("#9e0e24")
        .setTimestamp()
        .setFooter(
          "Podel, coded by the government of georgia",
          bot.user.displayAvatarURL
        );

      message.channel.send(embed);
    } */
  } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "play"
}
