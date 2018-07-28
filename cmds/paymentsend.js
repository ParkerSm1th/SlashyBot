var includes = require('./includes.js');
var request = require('request');
var querystring = require('querystring');

module.exports.run = async (bot, message, args, helpers) => {

  if (helpers.checkPerms(message, "Freelancer")) {
    if (args[1] == null) {
      helpers.sendErrorEmbed(message.channel, "You must use -paymentsend (amount)");
      return true;
    }
    var amt = args[1];
    var form = {
        amount: amt,
        channel: message.channel.name,
        discord: message.guild.name
    };

    var formData = querystring.stringify(form);
    var contentLength = formData.length;
    request({
      headers: {
        'Content-Length': contentLength,
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      uri: 'https://jenkinsdesigns.com/discord.php',
      body: formData,
      method: 'POST'
    }, function (err, res, body) {
      bot.guilds.get('442807156174225419').channels.find('name', 'payment-check').send(`<@300678696036073482>`);
      helpers.sendEmbed(bot.guilds.get('442807156174225419').channels.find('name', 'payment-send'), "Payment Send Request", [
        {
          name: "Channel",
          value: message.channel.name
        },
        {
          name: "User",
          value: `<@${message.author.id}>`
        },
        {
          name: "Amount",
          value: amt
        }
      ]).then(() => {
        helpers.sendSuccessEmbed(message.channel, "Request sent and email sent.");
      });
    });
  } else {
    helpers.permsError(message.channel);
  }

}

module.exports.help = {
  name:"paymentsend",
  others:[]
}
