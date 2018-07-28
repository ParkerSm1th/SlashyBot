var includes = require('./includes.js');
module.exports.run = async (bot, message, args, helpers) => {
  if (helpers.checkPerms(message, "Management") || helpers.checkPerms(message, "Sales Representative")) {
    message.channel.send({
      files: [{
        attachment: 'logs/' + message.channel.id + ".txt",
        name: message.channel.id + '.txt'
      }]
    })
    .then(helpers.sendSuccessEmbed(message.channel, "Here are the logs for the channel " + message.channel.name))
    .catch(console.error);
  } else {
    helpers.permsError(message.channel);
  }
}

module.exports.help = {
  name:"logs",
  others:[]
}
