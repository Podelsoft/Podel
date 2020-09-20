
module.exports.run = async (bot, message, args) => {

  message.channel.send('**Random Podel Video:** https://api.cristpz.eu/v1/podelvid \n**Random Podel Message:** https://api.cristpz.eu/v1/podel');
  
}

module.exports.help = {
  name: "apilist",
  type: "user"
}