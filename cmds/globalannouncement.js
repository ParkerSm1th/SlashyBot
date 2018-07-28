var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {

  if (message.author.id == 212630637365035009) {
    var msg = args.join(" ").slice(args[0].length + 1);
    bot.guilds.forEach(function (guild) {
      guild.channels.find('name', 'announcements').sendMessage(msg).then(() => {
        helpers.sendSuccessEmbed(message.channel, "Sent the message in " + guild.name);
      }).catch(err => includes.errorLog(err));
    });

  }

}

module.exports.help = {
  name:"gannounce",
  others:[]
}
