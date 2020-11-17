const Discord = require("discord.js");
const yts = require("yt-search");
let config = require("../config.json"),
  colour = config.colour;


module.exports.run = async (bot, message, args) => {

  let podelemoji = bot.emojis.cache.find(emoji => emoji.name === `podel`);

  if (!args[0]) return;

  if (message.member.voice.channel) {

    if (args[1] === "--file") {

      message.member.voice.channel.join().then(connection => {
        const dispatcher = connection.play(args[0]);
        dispatcher.on("end", () => {
          message.member.voice.channel.leave();
          message.channel.send("fucked off :white_check_mark:");
        });
      }).catch(err => console.log(err));

    } else {

      let isPlaying = bot.player.isPlaying(message.guild.id);

      let song = args.join(" ");

      if (!isPlaying) {
        while (true) {
          let track = await bot.player.play(message.member.voice.channel, song);
          if (track) {
            if (track.song) {
              yts(song, async (err, r) => {

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
              bot.player.getQueue(message.guild.id)
                .on('end', () => {
                  let embedend = new Discord.MessageEmbed()
                    .setTitle(
                      "#" + message.member.voice.channel.name + " | " + message.author.tag
                    )
                    .addField(`Ran out of songs mate:`, `please consider donating [here](https://www.paypal.me/christopherkarg) I really need to pay my second mortgage`)
                    .setColor(colour)
                    .setTimestamp()
                    .setFooter(
                      "Podel, coded by the government of georgia",
                      bot.user.displayAvatarURL()
                    );
                  message.channel.send(embedend);
                })
                .on('songChanged', (oldSong, newSong, repeatMode) => {
                  if (repeatMode) {
                    yts(newSong.name, async (err, r) => {

                      let videos = r.videos;

                      let embedchange1 = new Discord.MessageEmbed()
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
                      message.channel.send(embedchange1);
                    });
                  } else {
                    yts(oldSong.name, async (err, r) => {

                      let videos = r.videos;

                      let embedchange2 = new Discord.MessageEmbed()
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
                      message.channel.send(embedchange2);
                    });
                  }
                })
                .on('channelEmpty', () => {
                  let embedempty = new Discord.MessageEmbed()
                    .setTitle(
                      "#" + message.member.voice.channel.name + " | " + message.author.tag
                    )
                    .addField(`Channel ran out of users mate:`, `please consider donating [here](https://www.paypal.me/christopherkarg) I really need to pay my second mortgage`)
                    .setColor(colour)
                    .setTimestamp()
                    .setFooter(
                      "Podel, coded by the government of georgia",
                      bot.user.displayAvatarURL()
                    );
                  message.channel.send(embedempty);
                });
              return;
            }
          }
        }
      } else {
        message.channel.send("fuck off, use `p!add` to add songs to the queue")
      }
    }
  } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "play",
  aliases: ["p"],
  type: "user"
}
