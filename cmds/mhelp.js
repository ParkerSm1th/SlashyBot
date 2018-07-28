var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {
    if(helpers.checkPerms(message, "Management")) {

      helpers.sendEmbed(message.channel, "Management Commands", [
        {
          name: "-mhelp",
          value: "Show this menu"
        }
      ]);
    } else {
      helpers.permsError(message.channel);
    }

  }

module.exports.help = {
  name:"mhelp",
  others:["managerhelp"]
}
