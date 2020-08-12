const Discord = require("discord.js");
const config = require("./config.json"),
      colour = config.colour;
const token = require("../secret.json").token;
const bot = new Discord.Client({ disableEveryone: true });
const fs = require("fs");
const db = require("quick.db");
const ytdl = require('ytdl-core');
let cooldown = new Set();
let cds = 3;
bot.commands = new Discord.Collection();

const http = require("http");
const express = require("express");
const app = express();
const serveIndex = require('serve-index');

bot.on("voiceStateUpdate", function(oldMember, newMember){ 
    if (!newMember.voiceChannel) {
    let role = newMember.guild.roles.find("id", "730938567337181266");
    newMember.removeRole(role);
    } else {
    let role = newMember.guild.roles.find("id", "730938567337181266");
    newMember.addRole(role);
    }
});

/* app.use(express.static(__dirname + "/"))
 app.use('/chat', serveIndex(__dirname + '/chat'));

app.get("/", (request, response) => {
  response.sendFile("./blackjack/blackjack.html", { root: __dirname });
});

app.get(
  "/TKfex5ZBwufFXXeu6PMTBET3YNUtg9DQ7tnZWAH3WXTspm5jLZG5hwKmQNj3Behh/adminpanel.html",
  function(req, res) {
    res.sendFile(
      "./TKfex5ZBwufFXXeu6PMTBET3YNUtg9DQ7tnZWAH3WXTspm5jLZG5hwKmQNj3Behh/adminpanel.html",
      { root: __dirname }
    );
  }
);

app.get(
  "/TKfex5ZBwufFXXeu6PMTBET3YNUtg9DQ7tnZWAH3WXTspm5jLZG5hwKmQNj3Behh/restart",
  function(req, res) {
    res.sendFile(
      "./TKfex5ZBwufFXXeu6PMTBET3YNUtg9DQ7tnZWAH3WXTspm5jLZG5hwKmQNj3Behh/adminpanel.html",
      { root: __dirname }
    );

    try {
      app.webserver.close();
      console.log("webserver was halted", "success");
    } catch (e) {
      console.log("can't stop webserver:", "error");
      console.log(e, "error");
    }

    var cmd = "node index.js";

    if (app.killed === undefined) {
      app.killed = true;

      var exec = require("child_process").exec;
      exec(cmd, function() {
        console.log("app restarted", "success");
        process.kill();
      });
    }
    bot.destroy();
    bot.login(token);
  }
);

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);
*/

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
  bot.user.setPresence({
    game: {
      name:
        "friends is a gritty documentary that follows six drug dealers as they try and survive in the city of Hong Kong.",
      type: "STREAMING",
      url: "https://www.youtube.com/watch?v=CQ6fB4r7b4s"
    }
  });

  console.log(bot.user.username + " is online.");

});

bot.on("typingStart", function(channel, user) {
 /* if (user.id === "233786694741000192") {
     channel.send(`${user} still talking :/`);
   } */
/*  if (user.id === "325544798964547588") {
    if (channel.id === "696525484183519272") {
      channel.send(
        "https://media.discordapp.net/attachments/696525484183519272/709154486328754240/ezgif.com-add-text_9.gif"
      );
    }
  } */
});

bot.on("warn", function(info){
    console.log(`WARN: ${info}`);
});

bot.on("guildBanRemove", function(guild, user){
   let embed2 = new Discord.RichEmbed()
        .setTitle(`${user.tag} | Unban`)
        .setDescription(`${user.tag} was unbanned`)
        .setThumbnail(user.displayAvatarURL)
        .setColor("#3bb930")
        .setTimestamp()
        .setFooter(
          "Podel, coded by the government of georgia",
          bot.user.avatarURL
        );
if (guild.id !== "696515024746709003") return;
  bot.guilds
    .get("696515024746709003")
    .channels.get("696685949186342964")
    .send(embed2);
});

bot.on("guildBanAdd", function(guild, user){
   let embed2 = new Discord.RichEmbed()
        .setTitle(`${user.tag} | Ban`)
        .setDescription(`${user.tag} was banned`)
        .setThumbnail(user.displayAvatarURL)
        .setColor("#f60100")
        .setTimestamp()
        .setFooter(
          "Podel, coded by the government of georgia",
          bot.user.avatarURL
        );
  if (guild.id !== "696515024746709003") return;
  bot.guilds
    .get("696515024746709003")
    .channels.get("696685949186342964")
    .send(embed2);
});

bot.on("guildMemberUpdate", function(oldMember, newMember) {
  if (oldMember.displayName === newMember.displayName) return;

  let embed = new Discord.RichEmbed()
    .setTitle(`Edited Nickname`)
    .setAuthor(oldMember.user.tag, oldMember.user.avatarURL)
    .addField("Old Nickname", `\`\`\`${oldMember.displayName}\`\`\``, true)
    .addField("New Nickname", `\`\`\`${newMember.displayName}\`\`\``, true)
    .setColor('#ff6105')
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL);
  if (oldMember.guild.id !== "696515024746709003") return;
  bot.guilds
    .get("696515024746709003")
    .channels.get("696685949186342964")
    .send(embed);
});

bot.on("messageUpdate", function(oldMessage, newMessage) {
  
  if (oldMessage.content === newMessage.content) return;
  if (oldMessage.author.bot) return;
  if (newMessage.author.bot) return;
  
  let embed = new Discord.RichEmbed()
    .setTitle(`#${oldMessage.channel.name}`)
    .setAuthor(oldMessage.author.tag, oldMessage.author.avatarURL)
    .addField("Old Message", `\`\`\`${oldMessage.content}\`\`\``, true)
    .addField("New Message", `\`\`\`${newMessage.content}\`\`\``, true)
    .setColor(colour)
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL);
  if (oldMessage.guild.id !== "696515024746709003") return;
  bot.guilds
    .get("696515024746709003")
    .channels.get("696685949186342964")
    .send(embed);
});

bot.on("messageDelete", function(message){
  /*
  if (message.attachments) {
    
  var Attachment = (message.attachments).array();

  let attachment = new Discord.Attachment(Attachment[0].proxyURL, "saved.png");
  
  if (Attachment[0].proxyURL.includes('png')) attachment = new Discord.Attachment(Attachment[0].proxyURL, "saved.png");
  if (Attachment[0].proxyURL.includes('gif')) attachment = new Discord.Attachment(Attachment[0].proxyURL, "saved.gif");
  if (Attachment[0].proxyURL.includes('mp4')) attachment = new Discord.Attachment(Attachment[0].proxyURL, "saved.mp4");
  if (Attachment[0].proxyURL.includes('webm')) attachment = new Discord.Attachment(Attachment[0].proxyURL, "saved.webm");
 
    bot.guilds
    .get("696515024746709003")
    .channels.get("696685949186342964")
    .send(`**Deleted Attachment:** ${message.author.tag} | **In:** ${message.channel.name}`, attachment);
    return;
  } else { */
 
  if (message.content.toLowerCase().includes('NIGGER'.toLowerCase())) return;
  
  if (message.content.length > 1024) return; 
  
  if (message.author.bot) return;
  
  let embed = new Discord.RichEmbed()
    .setTitle(`#${message.channel.name}`)
    .setAuthor(message.author.tag, message.author.avatarURL)
    .addField("Deleted Message", `\`\`\`${message.content}\`\`\``, true)
    .setColor(colour)
    .setTimestamp()
    .setFooter("Podel, coded by the government of georgia", bot.user.avatarURL);
  if (message.guild.id !== "696515024746709003") return;
  bot.guilds
    .get("696515024746709003")
    .channels.get("696685949186342964")
    .send(embed);
 // }
});

bot.on("guildMemberAdd", member => {
  
  var role = member.guild.roles.find("id", "708436278302998600");

  if (!role) {
    return;
  } else {
    member.addRole(role);
  }

  let channel = bot.guilds
    .get("696515024746709003")
    .channels.get("696714277272158319");
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
  
  if (message.content.toLowerCase().includes('NIGGER'.toLowerCase())) {
    if(message.content.toLowerCase().includes('HTTP'.toLowerCase())) return;
    let embed = new Discord.RichEmbed()
      .setTitle(`${message.author.tag} | Warn`)
      .addField('Reason', 'Bad word usage', true)
      .addField('User', message.author.tag, true)
      .addField('Channel', message.channel.name, true)
      .setThumbnail(message.author.displayAvatarURL)
      .setColor(colour)
      .setTimestamp()
      .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL)
      await db.add(`badwordCount_${message.author.id}`, 1)
    message.delete().then(() => bot.guilds.get("696515024746709003").channels.get("696685949186342964").send(embed));
  }
  
  let badword = db.fetch(`badwordCount_${message.author.id}`);
  
  if (badword >= 3) {
    var role = message.guild.roles.find(role => role.name === "Muted");
    let mutetime = '10m';
    let ms = require("ms");
    await message.member.addRole(role);
    await db.delete(`badwordCount_${message.author.id}`)
    
    let embed = new Discord.RichEmbed()
      .setTitle(`${message.author.tag} | Mute`)
      .addField('Reason', 'Bad word usage', true)
      .addField('User', message.author.tag, true)
      .addField('Time', mutetime, true)
      .addField('Channel', message.channel.name, true)
      .setThumbnail(message.author.displayAvatarURL)
      .setColor(config.colour)
      .setTimestamp()
      .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL)

    await bot.guilds
      .get("696515024746709003")
      .channels.get("704356972606259220")
      .send(embed);

    setTimeout(function() {
      if (!message.author.roles.some(role => role.name === "Muted")) return;
      let embed2 = new Discord.RichEmbed()
      .setTitle(`${message.author.tag} | Unmute`)
      .addField('Time', mutetime, true)
      .addField('User', message.author.tag, true)
      .setThumbnail(message.author.displayAvatarURL)
      .setColor(config.colour)
      .setTimestamp()
      .setFooter('Podel, coded by the government of georgia', bot.user.avatarURL)
      message.member.removeRole(role);
      bot.guilds.get("696515024746709003").channels.get("704356972606259220").send(embed2);
    }, ms(mutetime));
  }
  
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
  
  /*let blacklisted = db.fetch(`blacklisted_${message.author.id}`);
  
  if (blacklisted === 1) {
    
    xp[message.author.id].xp = curxp;
    
  } */
  
    if (message.isMemberMentioned(bot.user)) {
      if (args.join(' ').includes('@here')) return;
      if (args.join(' ').includes('@everyone')) return;
      let j = args.join(' ');
      let q = j.split(bot.user)[0];
      let path = `./chat/${q.trim().toLowerCase()}.js`
      fs.readFile(path, 'utf8', function(err, data) {
        if (!err) {
          const clean = text => {
            if (typeof(text) === 'string')
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
              return text;
          }
          try {
            /*const code = `
message.channel.send(\`${ansrs[result]}\`)`;
            let evaled = eval(code);
            
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);*/
            
    if (err) throw err;
    let j2 = data.trim();
    var lines = j2.split("\n");
    const reply = lines[Math.floor(Math.random() * lines.length)];

    message.channel.send(reply);
            
          } catch (err) {
            console.log(err);
            message.channel.send('error sending message: ' + err);
          }
        } else {
          message.channel.send('I have no answer to that, but you can teach me how to answer that by using `p!ans <QUESTION> | <ANSWER>`')
        }
      });
    }
  
  if (message.channel.id === "696538508227248178") {
    
    xp[message.author.id].xp = curxp;
    
    /*if (message.isMemberMentioned(bot.user)) {
      if (args.join(' ').includes('@here')) return;
      if (args.join(' ').includes('@everyone')) return;
      let j = args.join(' ');
      let q = j.split(bot.user)[0];
      let path = `./chat/${q.trim().toLowerCase()}.js`
      fs.readFile(path, 'utf8', function(err, data) {
        if (!err) {
          const clean = text => {
            if (typeof(text) === 'string')
              return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
              return text;
          }
          try {
            /*const code = `
message.channel.send(\`${ansrs[result]}\`)`;
            let evaled = eval(code);
            
            if (typeof evaled !== "string")
              evaled = require("util").inspect(evaled);*/

       /*     if (err) throw err;
            let j2 = data.trim();
            var lines = j2.split("\n");
            const reply = lines[Math.floor(Math.random() * lines.length)];

            message.channel.send(reply);
          } catch (err) {
            console.log(err);
            message.channel.send('error sending message: ' + err);
          }
        } else {
          message.channel.send('I have no answer to that, but you can teach me how to answer that by using `p!ans <QUESTION> | <ANSWER>`')
        } 
      });
    }*/
    
  } else {
    
    /* if (message.isMemberMentioned(bot.user)) {
      let j = args.join(' ');
      let q = j.split(bot.user)[0];
      console.log(q.trim());
    } */

    if (message.guild.id === "696515024746709003") {
 
   /* if (cooldown.has(message.author.id)) {
        xp[message.author.id].xp = curxp;
    } else {
        curxp++;
        cooldown.add(message.author.id);
    }

  setTimeout(() => {
    xp[message.author.id].xp = curxp;   
   }, cds * 1000);*/
if (message.author.id === 90425297995837440){
  xp[message.author.id].xp = curxp;
}

  curxp++;
  xp[message.author.id].xp = curxp; fs.writeFile("./xp.json", JSON.stringify(xp), err => {
    if (err) console.log(err);
  });   

  if (nxtLvl <= xp[message.author.id].xp) {
    let lvlupmsgs = db.fetch(`lvmsgs_${message.author.id}`);
    xp[message.author.id].level = curlvl + 1;

    let lvlup = new Discord.RichEmbed()
      .setTitle(message.author.tag)
      .setColor("#9e0e24")
      .addField("PODEL LVL UP", curlvl + 1);
    
    if (curlvl >= 9) {
    if (!message.member.roles.some(role => role.name === "Lads")) {
      var role = message.guild.roles.find(role => role.name === "Lads");
      message.member.addRole(role);
    }
  }

  if (curlvl >= 19) {
    if (!message.member.roles.some(role => role.name === "Units")) {
      var role = message.guild.roles.find(role => role.name === "Units");
      message.member.addRole(role);
    }
  }

  if (curlvl >= 49) {
    if (!message.member.roles.some(role => role.name === "G")) {
      var role = message.guild.roles.find(role => role.name === "G");
      message.member.addRole(role);
    }
  }

  if (curlvl >= 99) {
    if (!message.member.roles.some(role => role.name === "Fused")) {
      var role = message.guild.roles.find(role => role.name === "Fused");
      var role2 = message.guild.roles.find(role => role.id === "696707967176802364");
      message.member.addRole(role);
      message.member.addRole(role2);
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

// let list = [`help`, `warn`, `clearwarn`, `kick`, `ban`, `check`, `clear`, `mute`, `unmute`, `tempban`, `unban`, `ans`, `bazinga`, `podelvid`, `xp`, `changelog`, `info`, `website`, `yep`, `conspiracy`, `yt`, `suggest`, `boiler`, `server`, `podel`, `brick`, `user`, `simp`, `global`, `leaderboard`, `opts`, `apilist`, `kojima`, `joblist`, `stats`, `store`, `buy`, `sell`, `lord`, `work`, `drive`, `invite`, `car`]

      if (command2 === undefined) return message.channel.send('that command doesn\'t exist');

      if (!command2) return message.channel.send('did you mean: `' + search + '`')

      command2.run(bot, message, args);
    } catch (err) {
      console.error(err);
    }
  }
  
  /* let commandfile = bot.commands.get(command.slice(prefix.length)) || bot.commands.find(command => command.aliases && command.aliases.includes(command.slice(prefix.length)));
  if (commandfile) commandfile.run(bot, message, args); */
});
