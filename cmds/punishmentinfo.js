var includes = require('./includes.js');

  module.exports.run = async (bot, message, args, helpers) => {

    if (args.length != 2) {
      helpers.sendErrorEmbed(message.channel, "You must do -punishmentinfo (Punishment ID)");
      return true;
    }

    var id = args[1];

    helpers.sql.get(`SELECT * FROM punishments WHERE punishid ="${id}"`).then(row => {
      if (!row) {
        helpers.sendErrorEmbed(message.channel, "That is not a valid punishment.");
      } else {
        if (row.active == '0') {
          var active = "No";
        } else if (row.active == '1') {
          var active = 'Yes';
        }
        helpers.sendEmbed(message.channel, "Punishment #" + id, [
          {
            name: "User",
            value: row.username
          },
          {
            name: "Type",
            value: row.type
          },
          {
            name: "Reason",
            value: row.reason
          },
          {
            name: "Child Company",
            value: bot.guilds.get(row.guildid).name
          },
          {
            name: "Punisher",
            value: message.guild.members.get(row.op).user.username
          },
          {
            name: "Time",
            value: row.timestamp
          },
          {
            name: "Active",
            value: active
          }
        ]);
      }
    });

  }

module.exports.help = {
  name:"pinfo",
  others:["punishmentinfo"]
}
