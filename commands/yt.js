module.exports.run = async (bot, message, args) => {

  if (!args.join(' ')) return;

  const yts = require('yt-search');

  yts(args.join(), function (err, r) {
    const videos = r.videos

    message.channel.send(videos[0].url)
  })
}

module.exports.help = {
  name: "yt",
  aliases: ['youtube', 'searchyt'],
  type: "user"
}
