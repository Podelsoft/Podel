const Discord = require("discord.js");
const config = require("./config.json"),
  colour = config.colour;
const token = require("../secret.json").token;
const bot = new Discord.Client({disableMentions: 'everyone'});
const fs = require("fs");
const db = require("quick.db");
const ytdl = require('ytdl-core');
let cooldown = new Set();
let cds = 3;
bot.commands = new Discord.Collection();

//bot.on('debug', console.log);

const { Player } = require("discord-music-player");
const player = new Player(bot, "AIzaSyBmLicH5RE9zLo8tUlrWbhZyUaxX8v_hV4");
bot.player = player;

const express = require('express')
const app = express()
const statusMonitor = require('express-status-monitor')({ title: 'Podel Bot Status' });
app.use(statusMonitor);
app.get('/', statusMonitor.pageRoute);
//app.listen(3000);

fs.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");

  if (jsfile.length <= 0) {
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.login(token);

bot.on("ready", async () => {
  bot.user.setActivity(
    "Fight at Dawat restaurant in Southall, West London UK.",
    { url: "https://www.youtube.com/watch?v=YKMfsJqpyWo", type: "STREAMING" }
  );

  console.log(bot.user.username + " is online.");

});

bot.on("warn", function (info) {
  console.log(`WARN: ${info}`);
});

bot.on("guildBanRemove", function (guild, user) {
  let embed2 = new Discord.MessageEmbed()
    .setTitle(`${user.tag} | Unban`)
    .setDescription(`${user.tag} was unbanned`)
    .setThumbnail(user.displayAvatarURL())
    .setColor("#3bb930")
    .setTimestamp()
    .setFooter(
      "Podel, coded by the government of georgia",
      bot.user.avatarURL()
    );
  if (guild.id !== "696515024746709003") return;
  bot.guilds.cache
    .get("696515024746709003")
    .channels.cache.get("696685949186342964")
    .send(embed2);
});

bot.on("guildBanAdd", function (guild, user) {
  let embed2 = new Discord.MessageEmbed()
    .setTitle(`${user.tag} | Ban`)
    .setDescription(`${user.tag} was banned`)
    .setThumbnail(user.displayAvatarURL())
    .setColor("#f60100")
    .setTimestamp()
    .setFooter(
      "Podel, coded by the government of georgia",
      bot.user.avatarURL()
    );
  if (guild.id !== "696515024746709003") return;
  bot.guilds.cache
    .get("696515024746709003")
    .channels.cache.get("696685949186342964")
    .send(embed2);
});

bot.on("guildMemberUpdate", function (oldMember, newMember) {
  if (oldMember.displayName === newMember.displayName) return;

  let embed = new Discord.MessageEmbed()
    .setTitle(`Edited Nickname`)
    .setAuthor(oldMember.user.tag, oldMember.user.avatarURL())
    .addField("Old Nickname", `\`\`\`${oldMember.displayName}\`\`\``, true)
    .addField("New Nickname", `\`\`\`${newMember.displayName}\`\`\``, true)
    .setColor('#ff6105')
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL());
  if (oldMember.guild.id !== "696515024746709003") return;
  bot.guilds.cache
    .get("696515024746709003")
    .channels.cache.get("696685949186342964")
    .send(embed);
});

bot.on("messageUpdate", function (oldMessage, newMessage) {

  if (oldMessage.content === newMessage.content) return;
  if (oldMessage.author.bot) return;
  if (newMessage.author.bot) return;

  let embed = new Discord.MessageEmbed()
    .setTitle(`#${oldMessage.channel.name} | ID: ${oldMessage.id}`)
    .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL())
    .addField("Old Message", `\`\`\`${oldMessage.content}\`\`\``, true)
    .addField("New Message", `\`\`\`${newMessage.content}\`\`\``, true)
    .setColor(colour)
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL());
  if (oldMessage.guild.id !== "696515024746709003") return;
  bot.guilds.cache
    .get("696515024746709003")
    .channels.cache.get("696685949186342964")
    .send(embed);
});

bot.on("messageDelete", async message => {
  
  var Attachment = (message.attachments).array();

  if (message.attachments.size > 0) {

  //let attachment = new Discord.Attachment(Attachment[0].proxyURL(), "saved.png");

  if (message.author.bot) return;

  let embed = new Discord.MessageEmbed()
    .setTitle(`#${message.channel.name} | ID: ${message.id}`)
    .setAuthor(message.author.tag, message.author.avatarURL())
    .setImage(Attachment[0].proxyURL)
    .setColor(colour)
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL());

  if (message.guild.id !== "696515024746709003") return;

  if (message.content.length >= 1) 
  {
    embed.addField("Deleted Message", `\`\`\`${message.content}\`\`\``, true)
    await bot.guilds.cache
    .get("696515024746709003")
    .channels.cache.get("696685949186342964")
    .send(embed);
    return;
  } else {
    await bot.guilds.cache
    .get("696515024746709003")
    .channels.cache.get("696685949186342964")
    .send(embed);
    return;
  }

  } else {

  if (message.content.toLowerCase().includes('NIGGER'.toLowerCase())) return;

  if (message.content.length > 1024) return;

  if (message.author.bot) return;

  let embed = new Discord.MessageEmbed()
    .setTitle(`#${message.channel.name} | ID: ${message.id}`)
    .setAuthor(message.author.tag, message.author.avatarURL())
    .addField("Deleted Message", `\`\`\`${message.content}\`\`\``, true)
    .setColor(colour)
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL());
  if (message.guild.id !== "696515024746709003") return;
  bot.guilds.cache
    .get("696515024746709003")
    .channels.cache.get("696685949186342964")
    .send(embed);
   }
});

bot.on("guildMemberAdd", member => {

  let role = member.guild.roles.cache.find(role => role.id === "708436278302998600");

  if (!role) {
    return;
  } else {
    member.roles.add(role);
  }

  let channel = bot.guilds.cache
    .find(channel => channel.id === "696515024746709003")
    .channels.cache.get("696714277272158319");
  channel
    .send(
      `**${member.user.tag}**` +
      " joined the crap server \nhttps://cdn.glitch.com/5d94d2b3-55ae-4001-86e0-104c8c5e4005%2Fye-2-2.mp4?v=1590680942274"
    );
});

bot.on("message", async message => {

  if (message.author.bot) return;

  if (message.channel.id === "708435487525961840" && !message.member.hasPermission('KICK_MEMBERS') && !message.content.startsWith('p!join')) {
    message.delete();
    return;
  }

  let config = require('./config.json'),
    colour = config.colour;

  const xp = require("./xp.json");

  if (!xp[message.author.id]) {
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }

  let content = message.content.split(" ");
  let command = content[0];
  let args = content.slice(1);
  let prefix = config.prefix;

  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl =
    5 * (xp[message.author.id].level * xp[message.author.id].level) +
    50 * xp[message.author.id].level +
    100;

  if (message.channel.id === "696538508227248178") {

    xp[message.author.id].xp = curxp;

  } else {

    if (message.guild.id === "696515024746709003") {

      if (message.content.toLowerCase().includes('NIGGER'.toLowerCase())) {
        if (message.content.toLowerCase().includes('HTTP'.toLowerCase())) return;
        let embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag} | Warn`)
          .addField('Reason', 'Bad word usage', true)
          .addField('User', message.author.tag, true)
          .addField('Channel', message.channel.name, true)
          .setThumbnail(message.author.displayAvatarURL())
          .setColor(colour)
          .setTimestamp()
          .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL())
        await db.add(`badwordCount_${message.author.id}`, 1)
        message.delete().then(() => bot.guilds.cache.get("696515024746709003").channels.cache.get("696685949186342964").send(embed));
      }

      let badword = db.fetch(`badwordCount_${message.author.id}`);

      if (badword >= 3) {
        var role = message.guild.roles.cache.find(role => role.name === "Muted");
        let mutetime = '10m';
        let ms = require("ms");
        await message.member.roles.add(role);
        await db.delete(`badwordCount_${message.author.id}`)

        let embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.tag} | Mute`)
          .addField('Reason', 'Bad word usage', true)
          .addField('User', message.author.tag, true)
          .addField('Time', mutetime, true)
          .addField('Channel', message.channel.name, true)
          .setThumbnail(message.author.displayAvatarURL())
          .setColor(config.colour)
          .setTimestamp()
          .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL())

        await bot.guilds.cache
          .get("696515024746709003")
          .channels.cache.get("704356972606259220")
          .send(embed);

        setTimeout(function () {
          if (!message.author.roles.cache.some(role => role.name === "Muted")) return;
          let embed2 = new Discord.MessageEmbed()
            .setTitle(`${message.author.tag} | Unmute`)
            .addField('Time', mutetime, true)
            .addField('User', message.author.tag, true)
            .setThumbnail(message.author.displayAvatarURL())
            .setColor(config.colour)
            .setTimestamp()
            .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL())
          message.member.roles.remove(role);
          bot.guilds.cache.get("696515024746709003").channels.cache.get("704356972606259220").send(embed2);
        }, ms(mutetime));
      }
      
      curxp++;
      xp[message.author.id].xp = curxp; fs.writeFile("./xp.json", JSON.stringify(xp), err => {
        if (err) console.log(err);
      });

      if (nxtLvl <= xp[message.author.id].xp) {
        let lvlupmsgs = db.fetch(`lvmsgs_${message.author.id}`);
        xp[message.author.id].level = curlvl + 1;

        let lvlup = new Discord.MessageEmbed()
          .setTitle(message.author.tag)
          .setColor("#9e0e24")
          .addField("PODEL LVL UP", curlvl + 1);

        if (curlvl >= 9) {
          if (!message.member.roles.cache.some(role => role.name === "Lads")) {
            var role = message.guild.roles.cache.find(role => role.name === "Lads");
            message.member.roles.add(role);
          }
        }

        if (curlvl >= 19) {
          if (!message.member.roles.cache.some(role => role.name === "Units")) {
            var role = message.guild.roles.cache.find(role => role.name === "Units");
            message.member.roles.add(role);
          }
        }

        if (curlvl >= 49) {
          if (!message.member.roles.cache.some(role => role.name === "G")) {
            var role = message.guild.roles.cache.find(role => role.name === "G");
            message.member.roles.add(role);
          }
        }

        if (curlvl >= 99) {
          if (!message.member.roles.cache.some(role => role.name === "Fused")) {
            var role = message.guild.roles.cache.find(role => role.name === "Fused");
            var role2 = message.guild.roles.cache.find(role => role.id === "696707967176802364");
            message.member.roles.add(role);
            message.member.roles.add(role2);
          }
        }

        if (`${lvlupmsgs}` === null) {
          await message.author.send(lvlup);
        }

        if (`${lvlupmsgs}` === `on`) {
          await message.author.send(lvlup);
        }
      }
    }
  }

  if (!message.content.startsWith(prefix)) return;

  const args2 = message.content.slice(prefix.length).split(/ +/);
  const commandName = args2.shift().toLowerCase();

  if (message.content.startsWith(prefix)) {
    try {
      const command2 =
        bot.commands.get(commandName) ||
        bot.commands.find(
          cmd => cmd.help.aliases && cmd.help.aliases.includes(commandName)
        );

      if (command2 === undefined) return message.channel.send('that command doesn\'t exist');

      command2.run(bot, message, args);
    } catch (err) {
      console.error(err);
    }
  }

});
