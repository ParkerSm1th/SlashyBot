var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

  if (helpers.checkPerms(message, "Management")) {
      if (args.length != 2) {
        helpers.sendErrorEmbed(message.channel, "You must do -removewarn (Punishment ID)");
        return true;
      }

      var id = args[1];

      helpers.sql.get(`SELECT * FROM punishments WHERE punishid ="${id}" AND type="warn"`).then(row => {
        if (!row) {
          helpers.sendErrorEmbed(message.channel, "That is not a valid punishment warning.");
        } else {
          helpers.sql.run(`UPDATE punishments SET active="0" WHERE punishid="${id}"`).then(row1 => {
            helpers.sendSuccessEmbed(message.channel, "Removed warning #" + id + " from " + row.username + ".")
          });
        }
      });
  } else {
    helpers.permsError(message.channel);
  }


  }

module.exports.help = {
  name:"removewarn",
  others:["rw"]
}
