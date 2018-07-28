var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    let user = message.mentions.members.first() || message.guild.members.get(args[0]);
    if(!user) {
      helpers.sendErrorEmbed(message.channel, "You must do -warns @User");
      return true;
    }

    helpers.sql.get(`SELECT * FROM punishments WHERE userid ="${user.id}" AND type="warn" AND active="1"`).then(row => {
      if (!row) {
        helpers.sendErrorEmbed(message.channel, "That user has no active warnings.");
      } else {
        helpers.sql.get(`SELECT COUNT(*) FROM punishments WHERE userid ="${user.id}" AND type="warn" AND active="1"`).then(row => {
          helpers.sendSuccessEmbed(message.channel, `Currently ${user} has ${Object.values(row)[0]} warnings. To see info about a specific punishment do -punishmentinfo (Punishment ID)`);
        });
      }
    });

  }

module.exports.help = {
  name:"warns",
  others:["warnings"]
}
