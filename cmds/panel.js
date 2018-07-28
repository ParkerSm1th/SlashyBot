var includes = require('./includes.js');
const request = require('request');
var querystring = require('querystring');

module.exports.run = async (bot, message, args, helpers) => {

  if (message.guild.id == "442807156174225419") {
    if (helpers.checkPerms(message, "The Board") || helpers.checkPerms(message, "The Ghost")) {
      var num = Math.floor(Math.random() * 90000000000) + 100000000;
      var form = {
          code: num,
          author: message.author.id,
          api: "f6343470-7837-41b5-babb-cca1fb1f05e6"
      };

      var formData = querystring.stringify(form);
      var contentLength = formData.length;
      request({
        headers: {
          'Content-Length': contentLength,
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        uri: 'https://slashy.co.uk/work/staff/newCode.php',
        body: formData,
        method: 'POST'
      }, function (err, res, body) {
        helpers.sendSuccessEmbed(message.channel, "Check your DMs!");
        helpers.sendEmbed(message.author, "New Panel Code", [
          {
            name: "Code",
            value: num
          },
          {
            name: "Register Link",
            value: `http://slashy.co.uk/work/staff/register.php`
          }
        ]);
      });
  }

  }
}
module.exports.help = {
  name:"panel",
  others:["code"]
}
