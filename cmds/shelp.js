var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    if(helpers.checkPerms(message, "Freelancer")) {

      helpers.sendEmbed(message.channel, "Staff Commands", [
        {
          name: "-shelp",
          value: "Show this menu"
        }
      ]);
    } else {
      helpers.permsError(message.channel);
    }

  }

module.exports.help = {
  name:"shelp",
  others:["staffhelp"]
}
