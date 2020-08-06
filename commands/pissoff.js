const Discord = require("discord.js");
const ytdl = require("ytdl-core");

module.exports.run = async (bot, message, args) => {

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
  
  let botvoice = message.guild.members.get('510483230151933964');
  
  if (message.member.voiceChannel) {
    if (!botvoice.voiceChannel) return; 
      message.channel.send("disconnected.");
      message.member.voiceChannel.leave(); 
    } else {
    message.reply("you need to join a voice channel first.");
  }
};

module.exports.help = {
  name: "pissoff",
  aliases: ['disconnect', 'leave', 'fuckoff', 'die']
}
