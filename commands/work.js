const db = require("quick.db"),
  ms = require("parse-ms");

module.exports.run = async (bot, message, args) => {

  const car = db.fetch(`car_${message.author.id}`);

  let job = db.fetch(`job_${message.author.id}`);
    
  let scp = 5;
  let tgp = 10;
  let amp = 60;
  let chp = 120;

  if (car !== null) scp = 14, tgp = 27, amp = 160, chp = 320;

  let cooldownjob = 4.32e7;

  let lastjob = await db.fetch(`lastjob_${message.author.id}`);

  if (lastjob !== null && cooldownjob - (Date.now() - lastjob) > 0) {
    let timeObjob = ms(cooldownjob - (Date.now() - lastjob));

    if (`${job}` === "Somerfield Cashier") {
      let cooldown1 = 3.6e6;

      let sccd = await db.fetch(`sccd_${message.author.id}`);

      if (sccd !== null && cooldown1 - (Date.now() - sccd) > 0) {
        let timeObj1 = ms(cooldown1 - (Date.now() - sccd));

        message.reply(
          `you have already worked for your ${scp} pounds mate, please wait ${timeObj1.hours}h ${timeObj1.minutes}m until your next payment`
        );
      } else {
        message.channel.send(
          `added £${scp} to your stats, come back in an hour for more`
        );

        db.set(`sccd_${message.author.id}`, Date.now());
        db.add(`balance_${message.author.id}`, scp);
      }
    }

    if (`${job}` === "Tesco Guard") {
      let cooldown2 = 7.2e6;

      let tgcd = await db.fetch(`tgcd_${message.author.id}`);

      if (tgcd !== null && cooldown2 - (Date.now() - tgcd) > 0) {
        let timeObj2 = ms(cooldown2 - (Date.now() - tgcd));

        message.reply(
          `you have already worked for your ${tgp} pounds mate, please wait ${timeObj2.hours}h ${timeObj2.minutes}m until your next payment`
        );
      } else {
        message.channel.send(
          `added £${tgp} to your stats, come back in 2 hours for more`
        );

        db.set(`tgcd_${message.author.id}`, Date.now());
        db.add(`balance_${message.author.id}`, tgp);
      }
    }

    if (`${job}` === "Aldi Manager") {
      let cooldown3 = 4.32e7;

      let amcd = await db.fetch(`amcd_${message.author.id}`);

      if (amcd !== null && cooldown3 - (Date.now() - amcd) > 0) {
        let timeObj3 = ms(cooldown3 - (Date.now() - amcd));

        message.reply(
          `you have already worked for your ${amp} pounds mate, please wait ${timeObj3.hours}h ${timeObj3.minutes}m until your next payment`
        );
      } else {
        message.channel.send(
          `added £${amp} to your stats, come back in 12 hours for more`
        );

        db.set(`amcd_${message.author.id}`, Date.now());
        db.add(`balance_${message.author.id}`, amp);
      }
    }

    if (`${job}` === "Chairman") {
      let cooldown4 = 8.64e7;

      let chcd = await db.fetch(`chcd_${message.author.id}`);

      if (chcd !== null && cooldown4 - (Date.now() - chcd) > 0) {
        let timeObj4 = ms(cooldown4 - (Date.now() - chcd));

        message.reply(
          `you have already worked for your ${chp} pounds mate, please wait ${timeObj4.hours}h ${timeObj4.minutes}m until your next payment`
        );
      } else {
        message.channel.send(
          `added £${chp} to your stats, come back in a day for more`
        );

        db.set(`chcd_${message.author.id}`, Date.now());
        db.add(`balance_${message.author.id}`, chp);
      }
    }
  } else {

    if (job !== null) {
      let jobs = [
      "Somerfield Cashier",
      "Tesco Guard",
      "Aldi Manager",
      "Chairman"
    ];

    let result = Math.floor(Math.random() * jobs.length);

    let earnings = 0;
    let jobname = 0;

    if (jobs[result] === "Somerfield Cashier")
      (earnings = `£${scp}/hour`), (jobname = "Somerfield Cashier");

    if (jobs[result] === "Tesco Guard")
      (earnings = `£${tgp}/2 hours`), (jobname = "Tesco Guard");

    if (jobs[result] === "Aldi Manager")
      (earnings = `£${amp}/12 hours`), (jobname = "Aldi Manager");

    if (jobs[result] === "Chairman")
      (earnings = `£${chp}/day`), (jobname = "Chairman");
    await db.delete(`job_${message.author.id}`);
      await db.push(`job_${message.author.id}`, jobname);
      await message.channel.send(
        `you have been assigned as a ${jobname}, your earnings are ${earnings}, use \`p!work\` to start earning.`
      );
     await db.set(`lastjob_${message.author.id}`, Date.now());
    } else if (job === null) {
      let jobs = [
      "Somerfield Cashier",
      "Tesco Guard",
      "Aldi Manager",
      "Chairman"
    ];

    let result = Math.floor(Math.random() * jobs.length);

    let earnings = 0;
    let jobname = 0;

    if (jobs[result] === "Somerfield Cashier")
      (earnings = `£${scp}/hour`), (jobname = "Somerfield Cashier");

    if (jobs[result] === "Tesco Guard")
      (earnings = `£${tgp}/2 hours`), (jobname = "Tesco Guard");

    if (jobs[result] === "Aldi Manager")
      (earnings = `£${amp}/12 hours`), (jobname = "Aldi Manager");

    if (jobs[result] === "Chairman")
      (earnings = `£${chp}/day`), (jobname = "Chairman");
      await db.push(`job_${message.author.id}`, jobname);
      await message.channel.send(
        `you have been assigned as a ${jobname}, your earnings are ${earnings}, use \`p!work\` to start earning.`
      );
     await db.set(`lastjob_${message.author.id}`, Date.now());
    }
  }
};

module.exports.help = {
  name: "work"
}
