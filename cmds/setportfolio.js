var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    if (helpers.checkPerms(message, "Freelancer")) {
      if (args.length != 2) {
        helpers.sendErrorEmbed(message.channel, "You must do -setportfolio (Portfolio Link) or -setportfolio none to remove your portfolio.")
        return true;
      } else {
        helpers.sql.get(`SELECT * FROM flport WHERE userid ="${message.author.id}"`).then(row => {
          if (!row) {
            helpers.sql.run(`INSERT INTO flport (userid, portfolio) VALUES (?, ?)`, [message.author.id, args[1]]).then(row => {
              helpers.sendSuccessEmbed(message.channel, "Updated your portfolio link to " + args[1]);
            });
          } else {
            helpers.sql.run(`UPDATE flport SET portfolio="${args[1]}" WHERE userid="${message.author.id}"`).then(row => {
              helpers.sendSuccessEmbed(message.channel, "Updated your portfolio link to " + args[1]);
            });
          }
        });
      }
    } else {
      helpers.permsError(message.channel);
    }

  }

module.exports.help = {
  name:"setportfolio",
  others:["sport"]
}
