const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  
  if (!args.join(' ')) return;
  
  const yts = require('yt-search');
 
yts(args.join(' '), function(err, r) {
  
  const videos = r.videos
  const playlists = r.playlists || r.lists
  const channels = r.channels || r.accounts
 
  message.channel.send(videos[0].url)
});
  
}

module.exports.help = {
  name: "yt",
  aliases: ['youtube', 'searchyt']
}