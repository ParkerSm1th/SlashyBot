var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    if (args.length != 2) {
      helpers.sendEmbed(message.channel, "Incorrect Usage", [
        {
          name: "You must specify a name",
          value: "-kiss (user)"
        }
      ]);
      return true;
    } else {
      if (message.mentions.users.first() != null) {
        const userExample = message.mentions.users.first();
        const actExamp = userExample.username;
        const kissComeback = ["Now that was not a good decision", "Yep, I approve", "Oi, I wanted that", "Well, you won't last long"];
        var kissTextEx = kissComeback[Math.floor(Math.random()*kissComeback.length)];
        if(message.author.username == actExamp) {
          helpers.sendEmbed(message.channel, "Agh, Err, ehh", [
            {
              name: "Unfortunately you cannot kiss yourself",
              value: "Try -datenight to find some secret tips, hehe"
            }
          ]);
        } else {
          helpers.sendEmbed(message.channel, "Kiss", [
            {
              name: message.author.username + " has kissed " + actExamp,
              value: kissTextEx
            }
          ]);
        }
      } else {
        helpers.sendEmbed(message.channel, "Incorrect Usage", [
          {
            name: "You must specify a real user",
            value: "-kiss (user)"
          }
        ]);
      }
    }

  }

module.exports.help = {
  name:"kiss",
  others:["smooch"]
}
