const Discord = require('discord.js');
let config = require('../config.json'),
    colour = config.colour;
const db = require('quick.db');
const xp = require('../xp.json');
const express = require("express");
const app = express();

module.exports.run = async (bot, message, args) => {

  if(message.author.id === config.ownerID) {
    message.channel.send('yes');
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
    bot.login(process.env.TOKEN)
  }

  if(message.author.id === config.ownerID2) {
    message.channel.send('yes');
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
    bot.login(process.env.TOKEN)
  }

}

module.exports.help = {
  name: "restart"
}