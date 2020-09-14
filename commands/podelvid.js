const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
  let { body } = await superagent.get("https://api.cristpz.eu/v1/podelvid");
  
  message.channel.send(body.url);
}
module.exports.help = {
  name: "podelvid"
}