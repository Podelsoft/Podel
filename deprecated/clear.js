module.exports.run = async (bot, message, args) => {
  
  if (message.guild.id !== "696515024746709003") return;
  
        if (message.deletable) {
            message.delete();
        }
  
        let trolemoji = bot.emojis.cache.find(emoji => emoji.name === `trole`);
    
        if (!message.member.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("you can't delete messages.").then(m => m.delete({timeout:5000}));
        }

        if (isNaN(args[0]) || parseInt(args[0]) <= 0) {
            return message.reply("mate that's not even a number, or you just tried to delete less than 1 message " + trolemoji).then(m => m.delete(5000));
        }

        if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
            return message.reply("I can't delete messages.").then(m => m.delete({timeout: 5000}));
        }

        let deleteAmount = args[0] + 1;

        if (parseInt(args[0]) > 100) {
            deleteAmount = 100;
        } else {
            deleteAmount = parseInt(args[0]);
        }

        message.channel.bulkDelete(deleteAmount, true)
            .then(deleted => message.channel.send(`deleted \`${deleted.size}\` messages.`).then(m => m.delete({timeout: 5000})))
            .catch(err => message.reply(`something went wrong: ${err}`));
  
}

module.exports.help = {
  name: "clear",
  aliases: ['clc']
}