var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    if(message.member.roles.find("name", "Married")) {
      var marryRole = message.member.guild.roles.find('name', 'Married');
      message.member.removeRole(marryRole);
      helpers.sendEmbed(message.channel, "Oh dear!", [
          {
            name: "You are now Divorced",
            value: "In life things don't always work out. Things have just slipped away unfortunately."
          }
        ]);
    } else {
      helpers.sendEmbed(message.channel, "Wow, just wow.", [
          {
            name: "You are not married",
            value: "To get married, please run -marry (user)"
          }
        ]);
    }

  }

module.exports.help = {
  name:"divorce",
  others:["goaway"]
}
