var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {
  if(helpers.checkPerms(message, "Management")) {
    const meMessage = args.slice(1).join(' ');
    helpers.sendEmbed(message.channel, "Slashy Embed", [
      {
        name: "Embed created by:",
        value: message.author.username
      },
      {
        name: "Message provided:",
        value: meMessage
      }
    ]);
  } else {
    helpers.permsError(message.channel);
  }
}

module.exports.help = {
  name: "embed",
  others:["me", "say"]
}
