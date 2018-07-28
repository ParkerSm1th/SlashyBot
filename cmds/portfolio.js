var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!user) {
      helpers.sendErrorEmbed(message.channel, "You must do -portfolio @User");
      return true;
    }
    includes.sql.get(`SELECT * FROM flport WHERE userid ="${user.id}"`).then(row => {
      if (row) {
        if (row.portfolio != "none") {
            helpers.sendSuccessEmbed(message.channel, user + "'s portfolio is " + row.portfolio);
        } else {
          helpers.sendSuccessEmbed(message.channel, user + " does not have a portfolio set.");
        }
      } else {
        helpers.sendSuccessEmbed(message.channel, user + " does not have a portfolio set.");
      }
    });


  }

module.exports.help = {
  name:"portfolio",
  others:["gp"]
}
