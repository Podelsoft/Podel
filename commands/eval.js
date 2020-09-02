const Discord = require('discord.js');
let config = require('../config.json'),
    colour = config.colour;
const db = require('quick.db');
const xp = require('../xp.json');
const fs = require('fs');

const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

module.exports.run = async (bot, message, args) => {
    
  if(message.author.id === config.ownerID) {
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      let embed = new Discord.MessageEmbed()
      .addField('Input', `\`\`\`${args.join(' ')}\`\`\``)
      .addField('Output', `\`\`\`${clean(evaled)}\`\`\``)
      .setColor(colour);
      
      message.channel.send(embed);
    } catch (err) {
      let embed = new Discord.MessageEmbed()
      .addField('Input', `\`\`\`${args.join(' ')}\`\`\``)
      .addField('Error', `\`\`\`xl\n${clean(err)}\n\`\`\``)
      .setColor(colour);
      
      message.channel.send(embed);
    }
  }

  if(message.author.id === config.ownerID2) {
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      let embed = new Discord.MessageEmbed()
      .addField('Input', `\`\`\`${args.join(' ')}\`\`\``)
      .addField('Output', `\`\`\`${clean(evaled)}\`\`\``)
      .setColor(colour);
      
      message.channel.send(embed);
    } catch (err) {
      let embed = new Discord.MessageEmbed()
      .addField('Input', `\`\`\`${args.join(' ')}\`\`\``)
      .addField('Error', `\`\`\`xl\n${clean(err)}\n\`\`\``)
      .setColor(colour);
      
      message.channel.send(embed);
    }
  }
  
  if(message.author.id === config.ownerID3) {
    try {
      const code = args.join(" ");
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
 
      let embed = new Discord.MessageEmbed()
      .addField('Input', `\`\`\`${args.join(' ')}\`\`\``)
      .addField('Output', `\`\`\`${clean(evaled)}\`\`\``)
      .setColor(colour);
      
      message.channel.send(embed);
    } catch (err) {
      let embed = new Discord.MessageEmbed()
      .addField('Input', `\`\`\`${args.join(' ')}\`\`\``)
      .addField('Error', `\`\`\`xl\n${clean(err)}\n\`\`\``)
      .setColor(colour);
      
      message.channel.send(embed);
    }
  }

}

module.exports.help = {
  name: "eval"
}
