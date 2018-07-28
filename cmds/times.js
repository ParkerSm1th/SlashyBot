var includes = require('./includes.js');

module.exports.run = async (bot, message, args, helpers) => {

  var d = new Date();
  var utc = d.getTime() - (d.getTimezoneOffset() * 60000);
  var nd = new Date(utc + (3600000*-7));
  var nd2 = new Date(utc + (3600000*+1));

  helpers.sendEmbed(message.channel, "Current time and date for President's", [
    {
      name: "Ben & Samee",
      value: nd2.toLocaleString()
    },
    {
      name: "Parker",
      value: nd.toLocaleString()
    }
  ]);

}

module.exports.help = {
  name:"times",
  others:["timezones"]
}
