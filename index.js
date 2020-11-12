const Discord = require("discord.js");
const bot = new Discord.Client({ disableMentions: "everyone" });
const secret = require("../secret.json"),
  token = secret.token;
const express = require("express");
const xp = require("./xp.json");

const app = express();
const path = require('path');

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname + "/website/src/front/index.html"));
});

app.get("/style.css", function (req, res) {
  res.sendFile(__dirname + "/website/src/back/style.css");
});

app.get("/leaderboard/balance", async (req, res) => {
  const db = require("quick.db");

  let money = db.all().filter((data) => data.ID.startsWith("balance")).sort((a, b) => b.data - a.data);
  money.length = 25;
  let list = [];
  var i = 0;
  let indexnum = 1;
  for (i in money) {
    let usertag = await bot.users.fetch(money[i].ID.split('_')[1]);
    let userpfp = await bot.users.fetch(money[i].ID.split('_')[1]);
    if (usertag === undefined) usertag = `<cannot fetch this user | ${money[i].ID.split('_')[1]}>`;
    userpfp = userpfp.avatarURL({ format: "png", dynamic: true, size: 256 });
    if (usertag.username.length > 20) usertag = `${usertag.username.slice(0, 10)}...#${usertag.discriminator}`;
    else usertag = `${usertag.username}#${usertag.discriminator}`;
    list.push(`<div id="${indexnum}" class="column" style="float:left;width:20%;padding:10px;"><h1>${indexnum}:</h1><p><img src="${userpfp}" width="100" height="100" border="2px">&nbsp&nbsp<p style="display:grid"><b>${usertag}</b> Balance: £${money[i].data}</p></p></div>`);
    indexnum++;
  }

  let endres = `
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
    <div class="container">
      <a class="navbar-brand" href="javascript:;">
            <img src="https://cdn.discordapp.com/avatars/748318848461176932/e10c017683d2d4ff54e3e8c97d2e7f93.png?size=64" alt="podelbot-logo">
          </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link" href="https://podel.cristpz.eu/leaderboard/xp">XP Leaderboard</a>
          </li>
          <li class="nav-item active">
            <a class="nav-link" href="javascript:;">Balance Leaderboard
                 <span class="sr-only">(current)</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://discord.gg/HgRKFMtVa5">Discord</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://cristpz.eu">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
  <center>
  <div class="row" style="content:;clear: both;display: table;">
  <br>
  <p style="font-size:50px">top 25 men who care about the economy</p>${list.join("")}</div></center>`;

  res.send(`\n${endres}</div>`);
});

app.get("/leaderboard/xp", async (req, res) => {
  let file = Object.entries(xp)
    .map(([key, val]) => ({ id: key, ...val }))
    .sort((a, b) => b.xp - a.xp);

  let n1 = 0,
    n2 = 25,
    n3 = 1;

  let result = file.slice(n1, n2);
  let data = JSON.stringify(result);

  data = data.replace(/[^0-9,]/g, '');
  data = data.split(',');

  var place = n3;

  let list = [];
  for (var i = 0; i < data.length; i = i + 3) {
    let usertag = await bot.users.fetch(data[i]);
    let userpfp = await bot.users.fetch(data[i]);
    if (usertag === undefined) usertag = `<cannot fetch this user | ${data[i]}>`;
    userpfp = userpfp.avatarURL({ format: "png", dynamic: true, size: 256 });
    if (usertag.username.length > 20) usertag = `${usertag.username.slice(0, 10)}...#${usertag.discriminator}`;
    else usertag = `${usertag.username}#${usertag.discriminator}`;
    list.push(`<div id="${place}" class="column" style="float:left;width:20%;padding:10px;"><h1>${place}:</h1><p><img src="${userpfp}" width="100" height="100" border="2px">&nbsp&nbsp<p style="display:grid"><b>${usertag}</b> LVL: ${data[i + 2]} | XP: ${data[i + 1]}</p></p></div>`);
    place++;
  }

  let endres = `
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.slim.min.js"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"></script>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark static-top">
    <div class="container">
      <a class="navbar-brand" href="javascript:;">
            <img src="https://cdn.discordapp.com/avatars/748318848461176932/e10c017683d2d4ff54e3e8c97d2e7f93.png?size=64" alt="podelbot-logo">
          </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
      <div class="collapse navbar-collapse" id="navbarResponsive">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item active">
            <a class="nav-link" href="javascript:;">XP Leaderboard
                  <span class="sr-only">(current)</span>
                </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://podel.cristpz.eu/leaderboard/balance">Balance Leaderboard</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://discord.gg/HgRKFMtVa5">Discord</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="https://cristpz.eu">Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <div class="container">
  <center>
  <div class="row" style="content:;clear: both;display: table;">
  <br>
  <p style="font-size:50px">top 25 fused men</p>${list.join("")}</div></center>`;

  res.send(`\n${endres}</div>`);
});

bot.login(token);

app.listen(80);

console.log("koke");