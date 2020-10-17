
module.exports.run = async (bot, message, args) => {
  let facts = [
    "nitro wanting nhs man back is probably the main reason why he's demoted",
    "blm protests but it's actually white people throwing bricks at the white house in DC",
    "ben shapiro logic and facts",
    "[object Object] means you've fucked up something",
    "koke is koke",
    "sparky is so fat yet so fit and sexy :kiss:",
    "shut up koke"
  ];

  let result = Math.floor(Math.random() * facts.length);

  message.channel.send(facts[result]);
}

module.exports.help = {
  name: "fact",
  aliases: ['factualinformation'],
  type: "user"
}