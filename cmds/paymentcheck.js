var includes = require('./includes.js');
var request = require('request');
var querystring = require('querystring');

module.exports.run = async (bot, message, args, helpers) => {

  if (helpers.checkPerms(message, "Freelancer")) {
    if (args.length < 3) {
      helpers.sendErrorEmbed(message.channel, "You must use -paymentcheck (amount) (paypal email)");
      return true;
    }
    var amt = args[1];
    var email = args[2];
    bot.guilds.get('442807156174225419').channels.find('name', 'payment-check').send(`<@300678696036073482>`);
    helpers.sendEmbed(bot.guilds.get('442807156174225419').channels.find('name', 'payment-check'), "Payment Check Request", [
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
      },
      {
        name: "Paypal Email",
        value: email
      }
    ]).then(() => {
      helpers.sendSuccessEmbed(message.channel, "Request sent.");
    });
  } else {
    helpers.permsError(message.channel);
  }

}

module.exports.help = {
  name:"paymentcheck",
  others:[]
}
