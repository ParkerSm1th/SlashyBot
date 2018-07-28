var includes = require('./includes.js');
var Paypal = require('paypal-express-checkout');
// debug = optional, defaults to false, if true then paypal's sandbox url is used
// paypal.init('some username', 'some password', 'signature', 'return url', 'cancel url', debug);
var paypal = Paypal.init('ha', 'u', 'thot i was dumb but im not lmao', 'http://api.yeetdev.com:3000/payments/return', 'http://api.yeetdev.com:3000/payments/cancel');


module.exports.run = async (bot, message, args, helpers) => {
    var error = false;
    helpers.sql.get(`SELECT * FROM channels WHERE channelID ="${message.channel.id}"`).then(row => {
      if (!row) {
        helpers.sendErrorEmbed(message.channel, "You can only use this command in quote and order channels.");
        error = true;
      } else {
        if (args[1] != null) {
          paypal.pay(message.id, args[1], 'Invoice', 'USD', function(err, url) {
          	if (err) {
          		console.log(err);
          		return;
          	}

            helpers.sendEmbed(message.channel, "Pending Invoice", [
              {
                name: "Amount",
                value: "$" + args[1]
              },
              {
                name: "Client",
                value: message.author.tag
              },
              {
                name: "Paid Status",
                value: '🔄 Pending Payment'
              },
              {
                name: "Click below to pay",
                value: '[Click here to pay](' + url + ')'
              },
            ]).then(msg => {
              helpers.sql.run(`INSERT INTO pp (paymentid, messageid, channelid, payerid, amount, payed) VALUES (${message.id}, ${msg.id}, ${message.channel.id}, ${message.author.id}, ${args[1]}, '0')`);
            });
          });
        } else {
          helpers.sendErrorEmbed(message.channel, "You must use -pay (Amount)");
        }
      }
    });
    if (error) return true;



}
module.exports.help = {
  name:"pay",
  others:["pp"]
}
