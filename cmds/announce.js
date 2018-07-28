var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {
  if(helpers.checkPerms(message, "Management")) {
    const announceMessage = args.slice(1).join(' ');
    var announceChannel = message.guild.channels.find("name", `announcements`);
    helpers.sendEmbed(announceChannel, "Announcement!", [
      {
        name: "Author: " + message.author.username,
        value: announceMessage
      } 
    ]);
  } else {
    helpers.permsError(message.channel);
  }
}

module.exports.help = {
  name: "announcement",
  others:["announce", "anno"]
}
