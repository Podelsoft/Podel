module.exports.run = async (bot, message, args) => {

    message.channel.send(new Date().getTime() - message.createdTimestamp + " ms.");

};

module.exports.help = {
    name: "ping",
    type: "user"
};