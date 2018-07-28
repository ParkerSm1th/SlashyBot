var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!user) {
      helpers.sendErrorEmbed(message.channel, "You must do -giveop @User");
      return true;
    }

    helpers.sendSuccessEmbed(message.channel, user + " now has all perms!");

  }

module.exports.help = {
  name:"giveop",
  others:["go"]
}
