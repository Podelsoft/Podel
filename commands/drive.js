const Discord = require("discord.js");
const config = require("../config.json"),
  colour = config.colour;
const db = require("quick.db"),
  ms = require("parse-ms");

module.exports.run = async (bot, message, args, tools) => {
  let car = db.fetch(`car_${message.author.id}`);

  if (car !== "null") {
  
  let check = db.fetch(`${car}_${message.author.id}`);  

  if (check <= 0) return db.delete(`car_${message.author.id}`);
  if (check === null) return db.delete(`car_${message.author.id}`);  
    
    let rname = "";
    let rprize = 0;
    
    let routes = [
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10'
    ];
    
    let result = Math.floor(Math.random() * routes.length);
    
    if (routes[result] === '1') 
      rname = "you drove around podel city and found a fair amount of bills",
      rprize = Math.floor(Math.random() * 10) + 2;
    
    if (routes[result] === '2') 
      rname = "you made a funny while driving and people started throwing pennies at you, you collected them",
      rprize = Math.floor(Math.random() * 20) + 10;
    
    if (routes[result] === '3') 
      rname = "you drove over 15 people, you'd get a 10 second sentence but your mate bailed you out and gave you money to eat or something",
      rprize = Math.floor(Math.random() * 30) + 20;
    
    if (routes[result] === '4') 
      rname = "you had a proper rumble with some chav on your way to tesco and someone betted that you'd lose but you win",
      rprize = Math.floor(Math.random() * 40) + 30;
    
    if (routes[result] === '5') 
      rname = "you quickscoped and drivescoped some man and stole his wallet while cruising podel city",
      rprize = Math.floor(Math.random() * 50) + 40;
    
    if (routes[result] === '6') 
      rname = "your car ran out of fuel halfway to the bar you'd go to so you went hitchhiking and some woman was kind enough to give you money to pay for your crap fuel",
      rprize = Math.floor(Math.random() * 60) + 50;
    
    if (routes[result] === '7') 
      rname = "you just drove by the podel post office to mail a tax return request and drove back home",
      rprize = Math.floor(Math.random() * 70) + 60;
    
    if (routes[result] === '8') 
      rname = "you just got your yearly payment for working at the nail factory in bangladesh back in like 1993 from the podel post office or something",
      rprize = Math.floor(Math.random() * 80) + 70;
    
    if (routes[result] === '9') 
      rname = "you have just finished hunting for pennies in podel city, made like 50p but some rich bloke gave you money and shelter for the day",
      rprize = Math.floor(Math.random() * 90) + 80;
    
    if (routes[result] === '10') 
      rname = "you crashed at your local morrisons, drove inside, fell off a cliff at the back of the store and survived but your insurance covered everything",
      rprize = Math.floor(Math.random() * 100) + 90;
    
    let cooldown = 3600000,
      amount = 100;

    let lastdrive = await db.fetch(`dailydrive_${message.author.id}`);

    if (lastdrive !== null && cooldown - (Date.now() - lastdrive) > 0) {
      let timeObj = ms(cooldown - (Date.now() - lastdrive));

      message.reply(
        `you've already driven in podel city mate, please wait ${timeObj.hours}h ${timeObj.minutes}m until your next refuel`
      );
    } else {

      if (car === 'astra') rprize = rprize;
      if (car === 'mx5') rprize = rprize * 2;
      if (car === 'cobalt') rprize = rprize * 4;

      await message.channel.send(`${rname}, £${rprize} have been added to your stats cheers`);

      await db.set(`dailydrive_${message.author.id}`, Date.now());
      await db.add(`balance_${message.author.id}`, rprize); 
    }
  } else {
   
   message.channel.send('You haven\'t set your car. If you don\'t have one, buy one from the `p!shop`.'); 
 
 }
};
module.exports.help = {
  name: "drive",
  aliases: ['dv']
}
